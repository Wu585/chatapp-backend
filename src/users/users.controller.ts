import { Body, Controller, Get, Patch, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  // @UseGuards(JwtAuthGuard)
  @Get("current-user")
  getCurrentUser(@Request() req) {
    return req.user;
  }

  @Patch(":id")
  update(@Request() req, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user.id, dto);
  }
}
