import { Injectable } from "@nestjs/common";
import * as process from "process";
import Replicate from "replicate";

@Injectable()
export class ReplicateService {
  replicate: any;

  constructor() {
    this.replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN1
    });
  }
}
