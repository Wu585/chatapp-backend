import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class ActorsService {
  constructor(private readonly prisma: PrismaService) {
  }

  findAll() {
    return this.prisma.actor.findMany();
  }

}
