import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { CategoriesService } from './services/categories.service';
import { PostsController } from './controllers/posts.controller';
import { PostsResolver } from './resolvers/posts.resolver';

@Module({
  providers: [PostsService, CategoriesService, PostsResolver],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
