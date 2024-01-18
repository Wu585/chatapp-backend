import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma.service";

@Injectable()
export class ActorsService {
  constructor(private readonly prisma: PrismaService) {
  }

  async findAll(page: number, perPage: number) {
    const [actors, counts] = await Promise.all([
      this.prisma.actor.findMany({
        skip: (page - 1) * perPage,
        take: perPage
      }),
      this.prisma.actor.count()
    ])

    return {actors, counts}
  }

  async searchActors(keyword: string, page: number, perPage: number) {
    const [actors, counts] = await Promise.all([
      this.prisma.actor.findMany({
        where: {
          title: {
            contains: keyword
          }
        },
        skip: (page - 1) * perPage,
        take: perPage
      }),
      this.prisma.actor.count({
        where: {
          title: {
            contains: keyword
          }
        }
      })
    ])

    return {actors, counts}
  }

}
