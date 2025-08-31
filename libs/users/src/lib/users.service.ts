import { Injectable } from '@nestjs/common';
import {
  ACTION_FAILURE_REASON,
  actionResult,
  ActionResult,
} from '@fitness-app/utils';
import { UsersRepository } from './users.repository';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async create(data: CreateUserDto): Promise<ActionResult<UserDto>> {
    const existingUser = await this.usersRepository.findOneByEmail(data.email, {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    });

    if (existingUser) {
      return actionResult.error(ACTION_FAILURE_REASON.EMAIL_ALREADY_IN_USE);
    }

    const user = await this.usersRepository.create(data, {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    });
    return actionResult.ok(user);
  }

  async update(
    id: string,
    data: UpdateUserDto
  ): Promise<ActionResult<UserDto>> {
    const existingUser = await this.usersRepository.findOne(id, {
      id: true,
    });

    if (!existingUser) {
      return actionResult.error(ACTION_FAILURE_REASON.USER_NOT_FOUND);
    }

    const user = await this.usersRepository.update(id, data, {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    });
    return actionResult.ok(user);
  }

  async delete(id: string): Promise<ActionResult<undefined>> {
    const existingUser = await this.usersRepository.findOne(id, {
      id: true,
    });

    if (!existingUser) {
      return actionResult.error(ACTION_FAILURE_REASON.USER_NOT_FOUND);
    }

    await this.usersRepository.delete(id, {
      id: true,
    });

    return actionResult.ok(undefined);
  }

  async findAll(limit: number, page: number): Promise<ActionResult<UserDto[]>> {
    const users = await this.usersRepository.findAll(limit, page, {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    });
    return actionResult.ok(users);
  }
}
