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
  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  signIn(@Request() req, @Body() dto: SignInUserDto) {
    return this.authService.signIn(req.user);
  }

  @Public()
  @Post("sign-up")
  async signup(@Body() dto: SignInUserDto) {
    return await this.authService.signUp(dto);
  }
}
