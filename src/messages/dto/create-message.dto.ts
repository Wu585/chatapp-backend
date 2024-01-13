import { IsNotEmpty, IsUUID } from "class-validator";
import { Role } from "@prisma/client";

export class CreateMessageDto {
  @IsNotEmpty()
  role: Role;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  model: string;

  @IsUUID()
  chatId: string;
}
