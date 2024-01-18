import {IsEnum, IsNotEmpty, IsString, IsUUID} from "class-validator";
import {Role} from "@prisma/client";

export class CreateMessageDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  model: string;

  @IsUUID()
  chatId: string;
}

export class createNormalMessageDto {
  @IsNotEmpty()
  messages: {
    role: Role
    content: string
  }[]

  @IsNotEmpty()
  @IsString()
  model: string
}
