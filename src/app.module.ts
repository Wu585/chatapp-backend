import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module";
import {PrismaService} from "./prisma.service";
import {APP_GUARD, APP_INTERCEPTOR} from "@nestjs/core";
import {TransformInterceptor} from "./interceptors/transform.interceptor";
import {MessagesModule} from './messages/messages.module';
import {ChatsModule} from './chats/chats.module';
import {OpenaiModule} from './openai/openai.module';
import {AudioModule} from './audio/audio.module';
import {ImagesModule} from './images/images.module';
import {VideoModule} from './video/video.module';
import {ReplicateModule} from './replicate/replicate.module';
import {MusicModule} from './music/music.module';
import {ActorsModule} from './actors/actors.module';
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MessagesModule,
    ChatsModule,
    OpenaiModule,
    AudioModule,
    ImagesModule,
    VideoModule,
    ReplicateModule,
    MusicModule,
    ActorsModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {
}
