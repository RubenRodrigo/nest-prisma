import { IsEmail, IsOptional, MinLength } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetUsersArgs {
  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
}
