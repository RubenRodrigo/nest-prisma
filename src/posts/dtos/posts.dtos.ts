import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsJSON,
  IsBoolean,
  IsOptional,
} from 'class-validator';

import { Post, Prisma } from '@prisma/client';
import { PartialType, ApiProperty } from '@nestjs/swagger';

type PostDto = Omit<Post, 'id'>;

export class CreatePostDto implements PostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `post's title` })
  readonly title: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ description: `post's published` })
  readonly published: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `post's author` })
  readonly authorId: number;

  @IsJSON()
  @IsOptional()
  @ApiProperty({ description: `post's comments` })
  readonly comments: Prisma.JsonValue;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: `post's views` })
  readonly views: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: `post's likes` })
  readonly likes: number;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
