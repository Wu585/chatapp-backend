import {Injectable} from "@nestjs/common";
import {HttpsProxyAgent} from "https-proxy-agent";
import OpenAI from "openai";
import * as process from "process";
import {Observable} from "rxjs";
import {PrismaService} from "../prisma.service";

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

  async createChatCompletion(messages: ChatCompletionRequestMessage[], model: string) {
    const completion = await this.openai.chat.completions.create({
      messages,
      model
    });

    return completion.choices[0].message;
  }

  async createStreamChatCompletion(messages: ChatCompletionRequestMessage[], model: string, userId: string): Promise<Observable<{
    data: string;
  }>> {

    return new Observable<{ data: string }>((subscriber) => {
      let str = ""

      this.openai.chat.completions.create({
        model,
        messages,
        stream: true
      }).then(async stream => {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            str += content
          }
          subscriber.next({data: content || ""});
        }
        console.log(str);
        subscriber.complete();
      });
    });
  }
}
