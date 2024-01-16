import {Injectable} from '@nestjs/common';
import {CreateAudioDto} from './dto/create-audio.dto';
import {UpdateAudioDto} from './dto/update-audio.dto';
import {OpenaiService} from "../openai/openai.service";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class AudioService {
  constructor(private readonly openaiService: OpenaiService) {
  }

  async create(dto: CreateAudioDto) {
    const {model,voice,input} = dto
    const mp3 = await this.openaiService.openai.audio.speech.create({
      model,
      voice,
      input,
    })

    return Buffer.from(await mp3.arrayBuffer())
  }

  findAll() {
    return `This action returns all audio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} audio`;
  }

  update(id: number, updateAudioDto: UpdateAudioDto) {
    return `This action updates a #${id} audio`;
  }

  remove(id: number) {
    return `This action removes a #${id} audio`;
  }
}
