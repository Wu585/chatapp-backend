import {Module} from "@nestjs/common";
import {OpenaiService} from "./openai.service";
import {PrismaService} from "../prisma.service";

@Module({
  providers: [OpenaiService, PrismaService],
  exports: [OpenaiService]
})
export class OpenaiModule {
}
