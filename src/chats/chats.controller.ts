import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";

@Controller("chats")
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {
  }

  @Get()
  getAll(@Request() req) {
    const user = req.user;
    return this.chatsService.getAllChats(user.id);
  }

  @Post()
  create(@Request() req, @Body() dto: CreateChatDto) {
    const user = req.user;
    return this.chatsService.createChat(user.id, dto);
  }

  @Patch(":id")
  update(@Request() req, @Param("id") id: string, @Body() dto: UpdateChatDto) {
    return this.chatsService.updateChat(req.user.id, id, dto);
  }

  @Delete(":id")
  delete(@Request() req, @Param("id") id: string) {
    return this.chatsService.deleteChat(req.user.id, id);
  }
}
