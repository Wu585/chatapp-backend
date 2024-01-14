import { Injectable } from "@nestjs/common";
import { HttpsProxyAgent } from "https-proxy-agent";
import OpenAI from "openai";
import * as process from "process";

const agent = new HttpsProxyAgent("http://127.0.0.1:7890");

export type ChatCompletionRequestMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam

@Injectable()
export class OpenaiService {
  openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
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

}
