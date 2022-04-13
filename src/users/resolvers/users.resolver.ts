import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from 'src/posts/models/post.model';
import { PostsService } from 'src/posts/services/posts.service';
import { GetUsersArgs } from '../dtos/get-users.args';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Query((returns) => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Query((returns) => [User], { name: 'users' })
  async getUsers(@Args() args: GetUsersArgs) {
    return this.usersService.findAll({ ...args });
  }

  // It's not too necesary
  @ResolveField('posts', (returns) => [Post])
  async getPosts(@Parent() user: User) {
    const { id } = user;
    return this.postsService.findAll({ authorId: id });
  }
}
