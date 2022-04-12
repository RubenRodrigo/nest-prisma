import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ExtendedProfile } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { CreateProfileDto, UpdateProfileDto } from '../dtos/profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prismaService: PrismaService) {}
  async findOne(id: number): Promise<ExtendedProfile> {
    const profile = await this.prismaService.extendedProfile.findUnique({
      where: {
        id,
      },
    });
    if (!profile) {
      throw new NotFoundException(`Profile #${id} not found`);
    }
    return profile;
  }

  findAll(): Promise<ExtendedProfile[]> {
    return this.prismaService.extendedProfile.findMany();
  }

  async createProfile(data: CreateProfileDto): Promise<ExtendedProfile> {
    try {
      const newUser = await this.prismaService.extendedProfile.create({
        data: {
          ...data,
        },
      });
      return newUser;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        console.log(e.message);
        throw new BadRequestException({
          error: e.meta,
        });
      }
    }
  }

  async updateProfile(
    id: number,
    data: UpdateProfileDto,
  ): Promise<ExtendedProfile> {
    const profile = await this.findOne(id);
    return this.prismaService.extendedProfile.update({
      where: { id: profile.id },
      data: {
        ...data,
      },
    });
  }

  async deleteProfile(id: number): Promise<ExtendedProfile> {
    const profile = await this.findOne(id);
    return this.prismaService.extendedProfile.delete({
      where: { id: profile.id },
    });
  }
}
