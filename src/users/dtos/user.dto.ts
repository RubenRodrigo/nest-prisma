import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Prisma, Role, User } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Modify } from 'src/common/types';

type UserDto = Omit<User, 'id'>;
type UserDtoModified = Modify<
  UserDto,
  {
    name?: string;
    profileViews?: number;
    role?: Role;
    coinflips?: boolean[];
  }
>;

export class CreateUserDto implements UserDtoModified {
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

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsBoolean({ each: true })
  @IsOptional()
  coinflips?: boolean[];

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
