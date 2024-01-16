import {Controller, Get, Post, Body, Patch, Param, Delete, Res, Header} from '@nestjs/common';
import {AudioService} from './audio.service';
import {CreateAudioDto} from './dto/create-audio.dto';
import {UpdateAudioDto} from './dto/update-audio.dto';
import {Response} from "express"
import {Readable} from "stream";


@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {
  }

  @Post("1")
  // @Header('Content-Type', 'application/octet-stream')
  // @Header('Content-Disposition', 'attachment; filename=audio.mp3')
  async create1(@Body() dto: CreateAudioDto, @Res() res: Response) {

    const buffer = await this.audioService.create(dto);
    const stream = Readable.from(async function* () {
      const chunkSize = 1024 * 10; // 设置每个数据块的大小，根据实际情况调整
      for (let i = 0; i < buffer.length; i += chunkSize) {
        const chunk = buffer.slice(i, i + chunkSize);
        yield chunk;
      }
    }())

    stream.on("data", (chunk) => {
      console.log("传输了一次")
      res.write(chunk)
    })

    stream.on("end", () => {
      console.log("结束了")
      res.end()
    })
  }

  @Post()
  // @Header('Content-Type', 'application/octet-stream')
  // @Header('Content-Disposition', 'attachment; filename=audio.mp3')
  async create(@Body() dto: CreateAudioDto, @Res() res: Response) {
    res.send(await this.audioService.create(dto))
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
