import { IsNotEmpty, IsString } from "class-validator";

export class CreateMusicDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;
}
