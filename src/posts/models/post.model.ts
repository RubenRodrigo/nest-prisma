import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prisma, Role } from '@prisma/client';

@ObjectType({ isAbstract: true })
export class Post {
  @Field((type) => ID)
  readonly id: number;

  @Field()
  readonly title: string;

  @Field()
  readonly published: boolean;

  @Field((type) => Int)
  readonly authorId: number;

  // @Field((type) => JSON, { nullable: true })
  // readonly comments: Prisma.JsonValue | null;

  @Field((type) => Int)
  readonly views: number;

  @Field((type) => Int)
  readonly likes: number;
}
