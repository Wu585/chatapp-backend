import { Module } from "@nestjs/common";
import { VideoService } from "./video.service";
import { VideoController } from "./video.controller";
import { ReplicateModule } from "../replicate/replicate.module";

@Module({
  imports: [ReplicateModule],
  controllers: [VideoController],
  providers: [VideoService]
})
export class VideoModule {
}
