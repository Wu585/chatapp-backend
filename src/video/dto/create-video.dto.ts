import { IsNotEmpty, IsString } from "class-validator";

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;
}
