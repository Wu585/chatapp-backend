import { IsNotEmpty, IsUUID } from "class-validator";

export class QueryMessagesDto {
  @IsNotEmpty()
  @IsUUID()
  chatId: string;
}
