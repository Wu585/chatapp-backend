import {Injectable} from "@nestjs/common";
import {HttpsProxyAgent} from "https-proxy-agent";
import OpenAI from "openai";
import * as process from "process";
import {Observable} from "rxjs";
import {PrismaService} from "../prisma.service";
import {CreateMessageDto} from "../messages/dto/create-message.dto";

const agent = new HttpsProxyAgent("http://127.0.0.1:7890");

export type ChatCompletionRequestMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam

@Injectable()
export class OpenaiService {
  openai: OpenAI;

  constructor(private readonly prisma: PrismaService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY1,
      httpAgent: agent
    });
  }

  /*async createChatCompletion(messages: ChatCompletionRequestMessage[], model: string) {
    const completion = await this.openai.chat.completions.create({
      messages,
      model
    });

    return completion.choices[0].message;
  }*/

  /*async createStreamChatCompletion(userId: string, dto: CreateMessageDto): Promise<Observable<{
    data: string;
  }>> {

    const {role, chatId, content, model} = dto

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

    return new Observable<{ data: string }>((subscriber) => {
      let str = ""

      this.openai.chat.completions.create({
        model,
        messages: [...mapMessages, mapCurrentMessage],
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
  }*/
}
