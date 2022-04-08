import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { ProfilesService } from './services/profiles.service';
import { ProfilesController } from './controllers/profiles.controller';

@Module({
  providers: [UsersService, ProfilesService],
  controllers: [UsersController, ProfilesController],
})
export class UsersModule {}
