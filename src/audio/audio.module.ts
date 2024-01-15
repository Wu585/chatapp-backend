import {Module} from '@nestjs/common';
import {AudioService} from './audio.service';
import {AudioController} from './audio.controller';
import {OpenaiModule} from "../openai/openai.module";

@Module({
  imports: [OpenaiModule],
  controllers: [AudioController],
  providers: [AudioService],
})
export class AudioModule {
}
