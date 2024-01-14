import { Body, Controller, Get, Param, Post, Request } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {
  }

  @Get(":chatId")
  findAll(@Request() req, @Param(":chatId") chatId: string) {
    return this.messagesService.findAll(req.user.id, chatId);
  }

  @Post()
  create(@Request() req, @Body() dto: CreateMessageDto) {
    return this.messagesService.create(req.user.id, dto);
  }

}
