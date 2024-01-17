import { Module } from "@nestjs/common";
import { ActorsService } from "./actors.service";
import { ActorsController } from "./actors.controller";
import { PrismaService } from "../prisma.service";

@Module({
  controllers: [ActorsController],
  providers: [ActorsService, PrismaService]
})
export class ActorsModule {
}
