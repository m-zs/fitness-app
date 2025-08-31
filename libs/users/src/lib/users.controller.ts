import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { unwrapActionResult } from '@fitness-app/utils';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    const result = await this.usersService.findOne(id);
    return unwrapActionResult(result);
  }
}
