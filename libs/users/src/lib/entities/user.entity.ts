import { ApiProperty } from '@nestjs/swagger';
import { AppRole, User, UserStatus } from '@fitness-app/app-models';

export class UserEntity implements User {
  @ApiProperty({
    description: 'The id of the user',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'test@test.com',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
    type: String,
  })
  password: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    type: String,
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
    type: String,
  })
  lastName: string;

  @ApiProperty({
    description: 'The status of the user',
    example: UserStatus.active,
    enum: UserStatus,
    enumName: 'UserStatus',
  })
  status: UserStatus;

  @ApiProperty({
    description: 'The role of the user',
    example: AppRole.user,
    enum: AppRole,
    enumName: 'AppRole',
  })
  role: AppRole;

  @ApiProperty({
    description: 'The created at date of the user',
    example: new Date(),
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The updated at date of the user',
    example: new Date(),
    type: Date,
  })
  updatedAt: Date;
}
