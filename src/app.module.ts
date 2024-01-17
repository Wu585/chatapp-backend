import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PrismaService } from "./prisma.service";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TransformInterceptor } from "./interceptors/transform.interceptor";
import { MessagesModule } from './messages/messages.module';
import { ChatsModule } from './chats/chats.module';
import { OpenaiModule } from './openai/openai.module';
import { AudioModule } from './audio/audio.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [AuthModule, UsersModule, MessagesModule, ChatsModule, OpenaiModule, AudioModule, ImagesModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService
  ]
})
export class AppModule {
}
