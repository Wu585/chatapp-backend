import { IsNotEmpty, Length } from "class-validator";

export class CreateChatDto {
  @IsNotEmpty({
    message: "标题不能为空!"
  })
  @Length(1, 32, {
    message: "标题长度必须在1-32个字符之间！"
  })
  title: string;
}
