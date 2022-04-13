import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { GetUsersArgs } from '../dtos/get-users.args';
import {
  CreateManyUserDto,
  CreateUserDto,
  UpdateUserDto,
} from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: number, posts = true, profile = true): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        posts,
        profile,
      },
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findAll(where?: GetUsersArgs): Promise<User[]> {
    return this.prismaService.user.findMany({ where });
  }
  async findFirstUserByPostsLikes(): Promise<User | {}> {
    const user = await this.prismaService.user.findFirst({
      where: {
        posts: {
          some: {
            likes: {
              gt: 100,
            },
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    if (!user) {
      return {};
    }
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const postData = data.posts?.map((post) => {
      return { ...post };
    });

    try {
      const newUser = await this.prismaService.user.create({
        data: {
          ...data,
          posts: {
            create: postData,
          },
        },
        include: {
          posts: true,
          profile: true,
        },
      });

      return newUser;
    } catch (e) {
      console.log(e);
      if (e instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException({
          error: e.meta,
        });
      }
    }
  }

  async createManyUser(data: CreateManyUserDto): Promise<{ count: number }> {
    const users = data.users.map((user) => {
      return { ...user };
    });
    try {
      const usersCreatedCount = await this.prismaService.user.createMany({
        data: users,
      });
      return usersCreatedCount;
    } catch (e) {
      console.log(e);
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002')
          throw new BadRequestException({
            description: 'There is a unique constraint violation.',
            error: e.meta,
          });
      }
    }
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    const postData = data.posts?.map((post) => {
      return { ...post };
    });

    return this.prismaService.user.update({
      where: { id: user.id },
      data: {
        ...data,
        posts: {
          create: postData,
        },
      },
      include: {
        posts: true,
      },
    });
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.findOne(id);

    return this.prismaService.user.delete({
      where: { id: user.id },
    });
  }
}
