import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Prisma, Role, User } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsOptional()
  profileViews?: number;

  @IsString()
  @IsOptional()
  role?: Role;

  @IsBoolean({ each: true })
  @IsOptional()
  coinflips?: Prisma.UserCreatecoinflipsInput | Prisma.Enumerable<boolean>;

  @IsOptional()
  posts?: Prisma.PostCreateInput[];

  @IsOptional()
  profile?: Prisma.ExtendedProfileCreateNestedOneWithoutUserInput;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class CreateManyUserDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
