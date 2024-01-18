import {IS_NUMBER, IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";

enum ImageModel {
  Dall2 = "dall-e-2",
  Dall3 = "dall-e-3"
}

enum ImageSize {
  A = "256x256",
  B = "512x512",
  C = "1024x1024",
  D = "1792x1024",
  E = "1024x1792",
}

enum Quality {
  Standard = "standard",
  Hd = "hd"
}

enum Style {
  Vivid = "vivid",
  Natural = "natural"
}

export class CreateImageDto {
  @IsEnum(ImageModel)
  model: ImageModel

  @IsNumber()
  n: number

  @IsEnum(ImageSize)
  size: ImageSize

  @IsString()
  @IsNotEmpty()
  prompt

  @IsEnum(Quality)
  quality: Quality

  @IsEnum(Style)
  style: Style
}
