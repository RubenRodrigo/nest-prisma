import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { ProfilesService } from './services/profiles.service';
import { ProfilesController } from './controllers/profiles.controller';
import { UsersResolver } from './resolvers/users.resolver';
import { PostsService } from 'src/posts/services/posts.service';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [PostsModule],
  providers: [UsersResolver, UsersService, ProfilesService],
  controllers: [UsersController, ProfilesController],
})
export class UsersModule {}
