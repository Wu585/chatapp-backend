import {Body, Controller, Post} from '@nestjs/common';
import {AlipayService} from "./alipay.service";

@Controller('alipay')
export class AlipayController {
  constructor(private readonly alipayService:AlipayService) {
  }
  @Post()
    create(@Body() dto){
    console.log(dto);
    return  this.alipayService.create(dto)
  }
}
