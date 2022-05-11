import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import PostsController from "./posts.controller";
import { PostsService } from "./posts.service";


@Module({
  // since Posts uses PrismaModule, must import here rather than App importing PrismaModule
  imports: [PrismaModule],
  controllers: [PostsController],
  providers: [PostsService]
})

export class PostsModule { }