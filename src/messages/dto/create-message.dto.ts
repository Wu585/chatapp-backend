import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { Role } from "@prisma/client";

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
