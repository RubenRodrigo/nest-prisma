import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { CategoriesService } from './services/categories.service';

@Module({
  providers: [PostsService, CategoriesService],
})
export class PostsModule {}
