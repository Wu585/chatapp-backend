import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { CreateChatDto } from "./dto/create-chat.dto";

@Injectable()
export class ChatsService {
  constructor(private readonly prisma: PrismaService) {
  }

  getAllChats(userId: string) {
    return this.prisma.chat.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  createChat(userId: string, dto: CreateChatDto) {
    return this.prisma.chat.create({
      data: {
        userId,
        ...dto
      }
    });
  }

  updateChat(userId: string, id: string, dto: UpdateChatDto) {
    return this.prisma.chat.update({
      where: {
        userId,
        id
      },
      data: dto
    });
  }

  deleteChat(userId: string, id: string) {
    return this.prisma.chat.delete({
      where: {
        userId,
        id
      }
    });
  }
}
