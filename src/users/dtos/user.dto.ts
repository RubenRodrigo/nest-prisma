import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Role, User } from '@prisma/client';

export class CreateUserDto implements User {
  name?: string;
  email: string;
  profileViews?: number;
  role?: Role;
  coinflips?: Prisma.UserCreatecoinflipsInput | Prisma.Enumerable<boolean>;
  posts?: Prisma.PostCreateNestedManyWithoutAuthorInput;
  profile?: Prisma.ExtendedProfileCreateNestedOneWithoutUserInput;
}
