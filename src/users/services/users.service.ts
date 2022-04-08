import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(data: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }
}
