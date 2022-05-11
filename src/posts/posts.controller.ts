import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostValidator } from './validation/createPostValidator';
import { FindOneParams } from '../utils/findOneParams';
import { UpdatePostValidator } from './validation/updatePostValidator';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {
  }

  @Get()
  async getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  async createPost(@Body() post: CreatePostValidator) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  async updatePost(
    @Param() { id }: FindOneParams,
    @Body() post: UpdatePostValidator,
  ) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: FindOneParams) {
    return this.postsService.deletePost(Number(id));
  }
}