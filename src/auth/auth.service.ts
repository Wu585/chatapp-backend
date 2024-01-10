import { ForbiddenException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { SignInUserDto } from "./dto/sign-in-user.dto";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await argon2.verify(user.password, pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async signUp(dto: SignInUserDto) {
    const user = await this.usersService.findOne(dto.username);

    if (user) {
      throw new ForbiddenException("用户已存在");
    }

    return await this.usersService.create(dto);
  }
}
