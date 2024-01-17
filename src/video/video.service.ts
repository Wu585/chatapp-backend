import { Injectable } from "@nestjs/common";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { ReplicateService } from "../replicate/replicate.service";

@Injectable()
export class VideoService {
  constructor(private readonly replicateService: ReplicateService) {
  }

  async create(dto: CreateVideoDto) {
    const { prompt } = dto;

    return await this.replicateService.replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt
        }
      }
    );
  }

}
