import {Controller, Get, Post, Body, Patch, Param, Delete, Res} from '@nestjs/common';
import { AudioService } from './audio.service';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import {Response} from "express"

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  async create(@Body() createAudioDto: CreateAudioDto,@Res()res:Response) {
    res.setHeader( 'Access-Control-Expose-Headers','Content-Disposition' )
    res.setHeader( 'Content-Type', 'application/octet-stream' )
    return  await this.audioService.create(createAudioDto);
  }

  @Get()
  findAll() {
    return this.audioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAudioDto: UpdateAudioDto) {
    return this.audioService.update(+id, updateAudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audioService.remove(+id);
  }
}
