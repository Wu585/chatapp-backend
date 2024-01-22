import {Controller, Get} from "@nestjs/common";
import {AppService} from "./app.service";
import {Public} from "./auth/constants"
import {ConfigService} from "@nestjs/config";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly configService:ConfigService) {
  }

  @Public()
  @Get()
  getHello(): string {
    console.log(this.configService.get("DB_HOST"))
    return this.appService.getHello();
  }
}
