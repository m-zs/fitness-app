import { PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { UserEntity } from '../entities/user.entity';

export class UserDto extends PickType(UserEntity, [
  'id',
  'email',
  'firstName',
  'lastName',
]) {
  // This ensures password is never included in API responses
  @Exclude({ toPlainOnly: true })
  password?: string;
}
