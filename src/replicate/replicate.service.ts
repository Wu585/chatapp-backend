import {Injectable} from "@nestjs/common";
import * as process from "process";
import Replicate from "replicate";
import {ConfigService} from "@nestjs/config";
import {ConfigEnum} from "../enum/config.enum";

@Injectable()
export class ReplicateService {
  replicate: any;

  constructor(private readonly configService: ConfigService) {
    this.replicate = new Replicate({
      auth: this.configService.get(ConfigEnum.REPLICATE_API_TOKEN1)
    });
  }
}
