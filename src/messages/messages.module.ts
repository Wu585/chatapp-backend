import {Module} from "@nestjs/common";
import {MessagesController} from "./messages.controller";
import {MessagesService} from "./messages.service";
import {OpenaiModule} from "../openai/openai.module";
import {PrismaService} from "../prisma.service";

@Module({
  imports: [OpenaiModule],
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService],
  exports: [MessagesService]
})
export class MessagesModule {
}
