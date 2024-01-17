import { Controller, Post, Body } from "@nestjs/common";
import { MusicService } from "./music.service";
import { CreateMusicDto } from "./dto/create-music.dto";

@Controller("music")
export class MusicController {
  constructor(private readonly musicService: MusicService) {
  }

  @Post()
  async create(@Body() createMusicDto: CreateMusicDto) {
    return await this.musicService.create(createMusicDto);
  }

}
