import { Module } from "@nestjs/common";
import { MusicService } from "./music.service";
import { MusicController } from "./music.controller";
import { ReplicateModule } from "../replicate/replicate.module";

@Module({
  imports: [ReplicateModule],
  controllers: [MusicController],
  providers: [MusicService]
})
export class MusicModule {
}
