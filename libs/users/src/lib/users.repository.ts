import { Injectable } from '@nestjs/common';
import { PrismaService, Prisma, UserStatus } from '@fitness-app/app-models';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne<P extends Prisma.UserSelect>(
    id: string,
    select: P
  ): Promise<Prisma.UserGetPayload<{ select: P }> | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
        status: {
          not: UserStatus.disabled,
        },
      },
      select,
    });

    return user;
  }

  async findOneByEmail<P extends Prisma.UserSelect>(
    email: string,
    select: P
  ): Promise<Prisma.UserGetPayload<{ select: P }> | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
        status: {
          not: UserStatus.disabled,
        },
      },
      select,
    });

    return user;
  }

  async create<P extends Prisma.UserSelect>(
    data: CreateUserDto,
    select: P
  ): Promise<Prisma.UserGetPayload<{ select: P }>> {
    const user = await this.prismaService.user.create({
      data,
      select,
    });

    return user;
  }

  async update<P extends Prisma.UserSelect>(
    id: string,
    data: UpdateUserDto,
    select: P
  ): Promise<Prisma.UserGetPayload<{ select: P }>> {
    const user = await this.prismaService.user.update({
      where: { id, status: { not: UserStatus.disabled } },
      data,
      select,
    });

    return user;
  }

  async delete<P extends Prisma.UserSelect>(
    id: string,
    select: P
  ): Promise<Prisma.UserGetPayload<{ select: P }>> {
    const user = await this.prismaService.user.update({
      where: { id, status: { not: UserStatus.disabled } },
      data: { status: UserStatus.disabled },
      select,
    });

    return user;
  }

  async findAll<P extends Prisma.UserSelect>(
    limit: number,
    page: number,
    select: P
  ): Promise<Prisma.UserGetPayload<{ select: P }>[]> {
    const users = await this.prismaService.user.findMany({
      where: { status: { not: UserStatus.disabled } },
      take: limit,
      skip: (page - 1) * limit,
      select,
    });

    return users;
  }
}
