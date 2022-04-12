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
import {
  CreateManyUserDto,
  CreateUserDto,
  UpdateUserDto,
} from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getList() {
    return this.userService.findAll();
  }

  @Get('first_user_by_posts_likes')
  async getFirstUserByLikes() {
    return this.userService.findFirstUserByPostsLikes();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() userDataDto: CreateUserDto) {
    return this.userService.createUser(userDataDto);
  }

  @Post('many')
  async createManyUser(@Body() manyUserDataDto: CreateManyUserDto) {
    return this.userService.createManyUser(manyUserDataDto);
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDataDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, userDataDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
