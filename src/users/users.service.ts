import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { User } from "@prisma/client";
import { SignInUserDto } from "../auth/dto/sign-in-user.dto";
import * as argon2 from "argon2";

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

  async create(user: SignInUserDto) {
    const currentUser = await this.prisma.user.create({
      data: {
        username: user.username,
        password: await argon2.hash(user.password)
      }
    });
    const { password, ...result } = currentUser;
    return result;
  }

}

