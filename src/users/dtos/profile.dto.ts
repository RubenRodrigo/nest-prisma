import { PartialType } from '@nestjs/swagger';
import { ExtendedProfile } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';
import { Modify } from 'src/common/types';

type ProfileDto = Omit<ExtendedProfile, 'id'>;
export class CreateProfileDto implements ProfileDto {
  @IsString()
  biography: string;
  @IsNumber()
  userId: number;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
