import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { ResponseInterceptor } from "./interceptors/transform.interceptor";
import * as cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());

  app.useGlobalPipes(new ValidationPipe({
    // 去除在类上不存在的字段
    whitelist: true
  }));

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix("api/v1");

  await app.listen(3000);
}

bootstrap();
