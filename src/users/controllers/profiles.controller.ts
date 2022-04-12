import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfileDto, UpdateProfileDto } from '../dtos/profile.dto';
import { ProfilesService } from '../services/profiles.service';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}

  @Get()
  async getList() {
    return this.profileService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.findOne(id);
  }

  @Post()
  createOne(@Body() profileDataDto: CreateProfileDto) {
    return this.profileService.createProfile(profileDataDto);
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() profileDataDto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(id, profileDataDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.deleteProfile(id);
  }
}
