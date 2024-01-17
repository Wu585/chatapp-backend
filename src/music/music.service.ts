import { Injectable } from "@nestjs/common";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { ReplicateService } from "../replicate/replicate.service";
import { CreateVideoDto } from "../video/dto/create-video.dto";

@Injectable()
export class MusicService {
  constructor(private readonly replicateService: ReplicateService) {
  }

  async create(dto: CreateVideoDto) {
    const { prompt } = dto;

    return await this.replicateService.replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt
        }
      }
    )
  }

}
