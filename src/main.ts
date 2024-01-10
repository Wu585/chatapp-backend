import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    // 去除在类上不存在的字段
    whitelist: true
  }));

  app.setGlobalPrefix("api/v1")

  await app.listen(3000);
}

bootstrap();
