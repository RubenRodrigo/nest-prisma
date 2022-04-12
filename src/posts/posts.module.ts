import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { CategoriesService } from './services/categories.service';
import { PostsController } from './controllers/posts.controller';

@Module({
  providers: [PostsService, CategoriesService],
  controllers: [PostsController],
})
export class PostsModule {}
