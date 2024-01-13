import { Request, Controller, HttpCode, HttpStatus, Post, UseGuards, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { Public } from "./constants";
import { SignInUserDto } from "./dto/sign-in-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("sign-in")
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Public()
  @Post("sign-up")
  async signup(@Body() dto) {
    return await this.authService.signUp(dto);
  }
}
