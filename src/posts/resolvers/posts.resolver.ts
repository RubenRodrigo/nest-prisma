import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpvotePostInput } from 'src/users/dtos/input/upvote-post.input';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query((returns) => Post, { name: 'post' })
  getPost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @Query((returns) => [Post], { name: 'posts' })
  getPosts(
    @Args('authorId', { type: () => Int, nullable: true }) authorId?: number,
  ) {
    return this.postsService.findAll({ authorId });
  }

  @Mutation((returns) => Post)
  async upvotePost(@Args('upvotePostData') upvotePostData: UpvotePostInput) {
    return this.postsService.upvoteById({ ...upvotePostData });
  }

  @Mutation((returns) => Post)
  async downvotePost(
    @Args({ name: 'postId', type: () => Int }) postId: number,
  ) {
    return this.postsService.downvoteById(postId);
  }
}
