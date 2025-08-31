import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ACTION_FAILURE_REASON,
  PaginationDto,
  createPaginationResponseSchema,
  unwrapActionResult,
} from '@fitness-app/utils';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get a user by id' })
  @ApiParam({ name: 'id', description: 'The id of the user', format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ACTION_FAILURE_REASON.USER_NOT_FOUND,
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    const result = await this.usersService.findOne(id);
    return unwrapActionResult(result);
  }

  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user',
    type: UserDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ACTION_FAILURE_REASON.EMAIL_ALREADY_IN_USE,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    console.log('createUserDto', createUserDto);
    const result = await this.usersService.create(createUserDto);
    return unwrapActionResult(result);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'The id of the user', format: 'uuid' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ACTION_FAILURE_REASON.USER_NOT_FOUND,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserDto> {
    const result = await this.usersService.update(id, updateUserDto);
    return unwrapActionResult(result);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'The id of the user', format: 'uuid' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The user' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ACTION_FAILURE_REASON.USER_NOT_FOUND,
  })
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const result = await this.usersService.delete(id);
    return unwrapActionResult(result);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({
    name: 'limit',
    description: 'The number of users to return',
    type: Number,
  })
  @ApiQuery({ name: 'page', description: 'The page number', type: Number })
  @ApiExtraModels(UserDto)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The users',
    schema: createPaginationResponseSchema({ $ref: getSchemaPath(UserDto) }),
  })
  @Get()
  async findAll(
    @Query('limit') limit: number,
    @Query('page') page: number
  ): Promise<PaginationDto<UserDto>> {
    const result = await this.usersService.findAll(limit, page);
    return {
      page,
      limit,
      items: unwrapActionResult(result),
    };
  }
}
