import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";

@Injectable()
export class ChatsService {
  constructor(private readonly prisma: PrismaService) {
  }

  getAllChats(userId: string) {
    return this.prisma.chat.findMany({
      where: {userId}
    });
  }

  createChat(title: string, userId: string) {
    return this.prisma.chat.create({
      data: {
        title,
        userId
      }
    })
  }

  deleteChat(id: string, userId: string) {
    return this.prisma.chat.delete({
      where: {
        userId,
        id
      }
    })
  }
}
