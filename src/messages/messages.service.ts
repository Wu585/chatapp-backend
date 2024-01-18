import {Injectable} from "@nestjs/common";
import {OpenaiService} from "../openai/openai.service";
import {CreateMessageDto, createNormalMessageDto} from "./dto/create-message.dto";
import {PrismaService} from "../prisma.service";
import {Observable} from "rxjs";

@Injectable()
export class MessagesService {
  constructor(
    private readonly openService: OpenaiService,
    private readonly prisma: PrismaService
  ) {
  }

  findAll(userId: string, chatId: string) {
    return this.prisma.message.findMany({
      where: {
        userId,
        chatId
      },
      orderBy: {
        createdAt: "asc"
      }
    });
  }

  async getTmpMessages(userId: string, dto: CreateMessageDto) {
    const {role, content, model, chatId} = dto;

    const currentMessage = await this.prisma.message.create({
      data: {
        userId,
        chatId,
        role,
        content
      }
    });

    const mapCurrentMessage = {
      role: currentMessage.role,
      content: currentMessage.content
    };

    const messages = await this.prisma.message.findMany({
      where: {
        userId,
        chatId
      }
    });

    const mapMessages = messages.map(message => ({
      role: message.role,
      content: message.content
    }));

    return [...mapMessages, mapCurrentMessage]
  }

  async create(userId: string, dto: CreateMessageDto) {
    const {model, chatId} = dto;

    const messages = await this.getTmpMessages(userId, dto)

    const completion = await this.openService.openai.chat.completions.create({
      messages,
      model
    });

    return this.prisma.message.create({
      data: {
        userId,
        chatId,
        content: completion.choices[0].message.content,
        role: completion.choices[0].message.role
      }
    });
  }

  async createSseMessage(userId: string, dto: CreateMessageDto): Promise<Observable<{
    data: string;
  }>> {
    const messages = await this.getTmpMessages(userId, dto)

    const {model, chatId} = dto;

    return new Observable<{ data: string }>((subscriber) => {
      let str = ""

      this.openService.openai.chat.completions.create({
        model,
        messages,
        stream: true
      }).then(async stream => {
        let resRole = undefined
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;

          const currentRole = chunk.choices[0]?.delta?.role

          if (currentRole) {
            resRole = currentRole
          }

          if (content) {
            str += content
          }

          subscriber.next({data: content || ""});
        }

        await this.prisma.message.create({
          data: {
            userId,
            chatId,
            role: resRole,
            content: str
          }
        });

        subscriber.complete();
      });
    });
  }

  async normalText(dto: createNormalMessageDto) {
    const {messages, model} = dto
    const completion = await this.openService.openai.chat.completions.create({
      messages,
      model
    });

    return completion.choices[0].message.content
  }

  async normalSse(dto: createNormalMessageDto) {
    const {messages, model} = dto

    return new Observable<{ data: string }>((subscriber) => {
      this.openService.openai.chat.completions.create({
        model,
        messages,
        stream: true
      }).then(async stream => {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;

          subscriber.next({data: content || ""});
        }

        subscriber.complete();
      });
    });
  }

}
