import { Body, Controller, Get, Header, Param, Post, Query, Request, Sse } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { QueryMessagesDto } from "../chats/dto/query-messages.dto";
import { interval, Observable, map } from "rxjs";
import { Public } from "../auth/constants";

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {
  }

  @Get()
  findAll(@Request() req, @Query() dto: QueryMessagesDto) {
    return this.messagesService.findAll(req.user.id, dto.chatId);
  }

  @Post("text")
  create(@Request() req, @Body() dto: CreateMessageDto) {
    return this.messagesService.create(req.user.id, dto);
  }

  @Get("stream")
  @Header("Content-type", "text/event-stream")
  @Sse()
  sse(@Request() req,@Query() dto:CreateMessageDto,): Promise<Observable<MessageEvent>> {
    console.log(req.user);
    return this.messagesService.createSseMessage(dto);
  }

}
