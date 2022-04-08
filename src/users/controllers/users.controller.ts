import { Body, Controller, Post } from '@nestjs/common';
import { User as UserModel, Prisma, Role } from '@prisma/client';
import { CreateUserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  async signupUser(@Body() userDataDto: CreateUserDto) {
    return this.userService.createUser(userDataDto);
  }
}
