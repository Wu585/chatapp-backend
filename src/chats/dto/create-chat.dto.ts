import { IsNotEmpty, Length } from "class-validator";

export class CreateChatDto {
  @IsNotEmpty({
    message: "标题不能为空!"
  })
  @Length(3, 32, {
    message: "标题长度必须在3-32个字符之间！"
  })
  title: string;
}
