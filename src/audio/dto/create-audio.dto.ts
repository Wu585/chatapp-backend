import {IsEnum, IsNotEmpty, IsString} from "class-validator";

enum VoiceRole {
  Alloy = "alloy",
  Echo = "echo",
  Fable = "fable",
  Onyx = "onyx",
  Nova = "nova",
  Shimmer = "shimmer",
}

export class CreateAudioDto {
  @IsString()
  @IsNotEmpty()
  model: string

  @IsNotEmpty()
  @IsEnum(VoiceRole)
  voice: VoiceRole

  @IsString()
  @IsNotEmpty()
  input: string
}
