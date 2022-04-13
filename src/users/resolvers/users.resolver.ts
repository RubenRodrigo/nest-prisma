import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostsService } from 'src/posts/services/posts.service';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
  ) {}

  @Query((returns) => User)
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Query((returns) => [User])
  async getUsers() {
    return this.usersService.findAll();
  }

  @ResolveField()
  async posts(@Parent() user: User) {
    const { id } = user;
    return this.postsService.findAll({ authorId: id });
  }
}
