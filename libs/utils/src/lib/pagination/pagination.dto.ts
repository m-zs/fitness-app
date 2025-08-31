import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto<T> {
  @ApiProperty({
    description: 'The page number',
    example: 1,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  page = 1;

  @ApiProperty({
    description: 'The number of items per page',
    example: 10,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  limit = 10;

  @ApiProperty({
    description: 'The items in the current page',
    type: 'array',
    items: { type: 'object' },
  })
  items: T[];
}
