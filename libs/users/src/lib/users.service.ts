import { Injectable } from '@nestjs/common';
import {
  ACTION_FAILURE_REASON,
  actionResult,
  ActionResult,
} from '@fitness-app/utils';
import { UsersRepository } from './users.repository';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(id: string): Promise<ActionResult<UserDto>> {
    const user = await this.usersRepository.findOne(id, {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    });

    if (!user) {
      return actionResult.error(ACTION_FAILURE_REASON.USER_NOT_FOUND);
    }

    return actionResult.ok(user);
  }
}
