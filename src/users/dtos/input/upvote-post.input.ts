import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpvotePostInput {
  @Field()
  @IsOptional()
  postId: number;
}
