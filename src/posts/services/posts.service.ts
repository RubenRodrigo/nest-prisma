import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreatePostDto, UpdatePostDto } from '../dtos/posts.dtos';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async findOne(id: number): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  findAll() {
    return this.prismaService.post.findMany({
      include: {
        author: true,
      },
    });
  }

  create(data: CreatePostDto) {
    return this.prismaService.post.create({
      data,
      include: {
        author: true,
      },
    });
  }

  async update(id: number, data: UpdatePostDto) {
    const post = await this.findOne(id);

    return this.prismaService.post.update({
      where: { id: post.id },
      data,
      include: {
        author: true,
      },
    });
  }

  async remove(id: number) {
    try {
      const removedPost = await this.prismaService.post.delete({
        where: { id },
      });
      return removedPost;
    } catch (e) {
      console.log(e);
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025')
          throw new NotFoundException({
            description: 'Post not found.',
            error: e.meta,
          });
      }
    }
  }
}
