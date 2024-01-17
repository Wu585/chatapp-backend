import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {ImagesService} from './images.service';
import {CreateImageDto} from './dto/create-image.dto';
import {UpdateImageDto} from './dto/update-image.dto';
import {join} from "path"

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {
  }

  @Post()
  create(@Body() dto: CreateImageDto) {
    return this.imagesService.create(dto);
  }

  @Get("history")
  findAll() {
    const path = join(__dirname, "../tmp-images")
    return this.imagesService.getHistoryImages(path);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
