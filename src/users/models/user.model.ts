import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { Post } from 'src/posts/models/post.model';

registerEnumType(Role, {
  name: 'Role',
  description: 'Role for User',
});

@ObjectType({ isAbstract: true })
export class User {
  @Field((type) => ID)
  readonly id: number;

  @Field({ nullable: true })
  readonly name: string;

  @Field()
  readonly email: string;

  @Field({ defaultValue: 0 })
  readonly profileViews: number;

  @Field(() => Role)
  readonly role: Role;

  @Field((type) => Boolean, { nullable: true })
  readonly coinflips: boolean[];

  @Field((type) => [Post])
  readonly posts: Post[];
}
