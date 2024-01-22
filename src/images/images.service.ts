import {Injectable} from '@nestjs/common';
import {CreateImageDto} from './dto/create-image.dto';
import {UpdateImageDto} from './dto/update-image.dto';
import {OpenaiService} from "../openai/openai.service";
import {HttpService} from "@nestjs/axios";
import {join} from "path"
import * as fs from "fs"
import {PrismaService} from "../prisma.service";
import * as process from "process";
import {ConfigService} from "@nestjs/config";
import {ConfigEnum} from "../enum/config.enum";

@Injectable()
export class ImagesService {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {
  }

  async create(userId: string, dto: CreateImageDto) {
    const {model, prompt, n, size, style, quality, user} = dto

    const images = await this.openaiService.openai.images.generate({
      model,
      prompt,
      n,
      size,
      quality,
      style,
      user
    })

    const imagesDirectoryPath = join(__dirname, "../tmp-images")

    this.checkDir()

    const promiseArray = images.data.map(async image => {
      const filename = new Date().getTime().toString() + ".png"
      const file = join(imagesDirectoryPath, filename)
      console.log(file);
      await this.prisma.image.create({
        data: {
          userId,
          prompt,
          filename
        }
      })
      await this.saveImage(image.url, file)
    })

    await Promise.all(promiseArray)

    return images.data;
  }

  async saveImage(imageUrl, outputPath) {
    try {
      const response = await this.httpService.axiosRef.get(imageUrl, {responseType: 'stream'});
      response.data.pipe(fs.createWriteStream(outputPath));

      return new Promise((resolve, reject) => {
        response.data.on('end', () => {
          resolve(null);
        });

        response.data.on('error', (err) => {
          reject(err);
        });
      });
    } catch (error) {
      throw new Error(`Error downloading the image: ${error}`);
    }
  }

  checkDir() {
    const imagesDirectoryPath = join(__dirname, "../tmp-images")
    // 检查目录是否存在，如果不存在就创建
    if (!fs.existsSync(imagesDirectoryPath)) {
      fs.mkdirSync(imagesDirectoryPath);
      console.log(`目录已创建：${imagesDirectoryPath}`);
    } else {
      console.log(`目录已存在：${imagesDirectoryPath}`);
    }
  }

  async getHistoryImages(userId: string) {
    try {
      // 读取目录下的所有文件
      this.checkDir()

      const filenames = await this.prisma.image.findMany({
        where: {userId}
      })

      return filenames.map(item => `${this.configService.get(ConfigEnum.ImageUrl)}/images/` + item.filename)
    } catch (error) {
      throw new Error(`Error downloading the image: ${error}`)
    }
  }

  getHistoryImages2(directoryPath) {
    try {
      // 读取目录下的所有文件
      this.checkDir()
      return fs.readdirSync(directoryPath).map(item => `${this.configService.get(ConfigEnum.ImageUrl)}/images/` + item);
    } catch (error) {
      throw new Error(`Error downloading the image: ${error}`)
    }
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
