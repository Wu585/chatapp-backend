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

  async create(createAudioDto: CreateAudioDto) {
    const speechFile = path.resolve("./speech.mp3");
    console.log(speechFile);
    const mp3 = await this.openaiService.openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: "Today is a wonderful day to build something people love!",
    })
    const buffer = Buffer.from(await mp3.arrayBuffer());
    // await fs.promises.writeFile(speechFile, buffer);

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
