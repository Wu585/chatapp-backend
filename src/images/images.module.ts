import {Module} from '@nestjs/common';
import {ImagesService} from './images.service';
import {ImagesController} from './images.controller';
import {OpenaiModule} from "../openai/openai.module";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [OpenaiModule, HttpModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {
}