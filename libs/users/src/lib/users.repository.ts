import { Injectable } from '@nestjs/common';
import { PrismaService, Prisma, UserStatus } from '@fitness-app/app-models';

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
}
