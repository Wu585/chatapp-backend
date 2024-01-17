import {Controller, Get, Post, Body, Patch, Param, Delete, Req} from '@nestjs/common';
import {ImagesService} from './images.service';
import {CreateImageDto} from './dto/create-image.dto';
import {UpdateImageDto} from './dto/update-image.dto';
import {join} from "path"

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {
  }

  @Post()
  create(@Req() req,@Body() dto: CreateImageDto) {
    return this.imagesService.create(req.user.id,dto);
  }

  @Get("history")
  async findAll(@Req() req) {
    return this.imagesService.getHistoryImages(req.user.id);
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
