import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { User } from "@prisma/client";
import { SignInUserDto } from "../auth/dto/sign-in-user.dto";
import * as argon2 from "argon2";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        username
      }
    });
  }

  async create(dto: SignInUserDto) {
    const currentUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        password: await argon2.hash(dto.password)
      }
    });
    const { password, ...result } = currentUser;
    return result;
  }

  async update(id: string, dto: UpdateUserDto) {
    const currentUser = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        username: dto.username,
        password: await argon2.hash(dto.password)
      }
    });
    const { password, ...result } = currentUser;
    return result;
  }

}

