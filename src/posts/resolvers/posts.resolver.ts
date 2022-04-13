import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query((returns) => Post)
  async getPost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }
}
