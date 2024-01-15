import {Injectable} from "@nestjs/common";
import {OpenaiService} from "../openai/openai.service";
import {CreateMessageDto} from "./dto/create-message.dto";
import {PrismaService} from "../prisma.service";

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
      }
    });
  }

  async create(userId: string, dto: CreateMessageDto) {
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

    const res = await this.openService.createChatCompletion([...mapMessages, mapCurrentMessage], model);

    return this.prisma.message.create({
      data: {
        userId,
        chatId,
        content: res.content,
        role: res.role
      }
    });
  }

  async createSseMessage(userId: string, dto: CreateMessageDto) {
    return this.openService.createStreamChatCompletion(userId, dto);
  }

}
