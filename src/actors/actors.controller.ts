import {Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe} from '@nestjs/common';
import {ActorsService} from './actors.service';
import {CreateActorDto} from './dto/create-actor.dto';
import {UpdateActorDto} from './dto/update-actor.dto';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {
  }

  @Get()
  findAll(
    @Query("keyword") keyword: string = "",
    @Query("page", ParseIntPipe) page: number = 1,
    @Query("perPage", ParseIntPipe) perPage: number = 10,
  ) {
    if (keyword === "") {
      return this.actorsService.findAll(page, perPage)
    } else {
      return this.actorsService.searchActors(keyword, page, perPage)
    }
  }

}
