import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from 'src/utils/prismaError';
import { PrismaService } from '../prisma/prisma.service';
import { PostNotFoundException } from './exceptions/postNotFound.exception';
import { CreatePostValidator } from './validation/createPostValidator';
import { UpdatePostValidator } from './validation/updatePostValidator';

@Injectable()
export class PostsService {
  // "Real" database, docker and postgresql
  constructor(private readonly prismaService: PrismaService) { }

  // findMany method without any argument in it returns all entities from the collection that is queried
  // can do this.prismaService.post as it is created when generating Prisma Client
  async getPosts() {
    return this.prismaService.post.findMany();
  }

  // findUnique method find a single identity based on id
  // throws an exception if the post == null and return post found otherwise
  async getPostById(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) {
      throw new PostNotFoundException(id);
    }
    return post;
  }

  // create method saves a new post in the database
  async createPost(post: CreatePostValidator) {
    return this.prismaService.post.create({
      data: post,
    });
  }

  // update method finds a post based on id (see where) and uses data sent to update
  // id: undefined to ignore id property so users cannot change id
  async updatePost(id: number, post: UpdatePostValidator) {
    try {
      return await this.prismaService.post.update({
        data: {
          ...post,
          id: undefined,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new PostNotFoundException(id);
      }
      throw error;
    }
  }

  async deletePost(id: number) {
    try {
      return this.prismaService.post.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new PostNotFoundException(id);
      }
      throw error;
    }
  }
}