import {Body, Controller, Get, Post, Query, Request, Sse} from "@nestjs/common";
import {MessagesService} from "./messages.service";
import {CreateMessageDto} from "./dto/create-message.dto";
import {QueryMessagesDto} from "../chats/dto/query-messages.dto";

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller("messages")
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService) {
  }

  @Get()
  findAll(@Request() req, @Query() dto: QueryMessagesDto) {
    return this.messagesService.findAll(req.user.id, dto.chatId);
  }

  @Post("text")
  create(@Request() req, @Body() dto: CreateMessageDto) {
    return this.messagesService.create(req.user.id, dto);
  }

  @Post("sse")
  @Sse()
  sse(@Request() req, @Body() dto: CreateMessageDto) {
    return this.messagesService.createSseMessage(req.user.id, dto);
  }

}
