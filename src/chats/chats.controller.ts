import {Body, Controller, Get, Post, Request} from '@nestjs/common';
import {ChatsService} from "./chats.service";

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {
  }

  @Get()
  getAll(@Request() req) {
    const user = req.user
    console.log('user--');
    console.log(user);
    return this.chatsService.getAllChats(user.id)
  }

  @Post()
  create(@Request() req, @Body() dto) {
    const user = req.user
    console.log('user');
    console.log(user);
    return this.chatsService.createChat(dto.title, user.id)
  }
}
