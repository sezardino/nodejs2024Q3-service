import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async findUserForAuth(login: string) {
    return await this.prisma.user.findUnique({ where: { login }, select: { id: true, login: true, password: true } })
  }

  async create(dto: CreateUserDto) {
    try {
      const { createdAt, updatedAt, ...rest } = await this.prisma.user.create({
        data: {
          login: dto.login,
          password: dto.password,
          createdAt: Date.now().toString(),
          updatedAt: Date.now().toString(),
          favorites: { create: {} },
        },
        select: {
          id: true,
          login: true,
          createdAt: true,
          updatedAt: true,
          version: true,
        },
      });

      return {
        ...rest,
        createdAt: Number(createdAt),
        updatedAt: Number(updatedAt),
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        login: true,
        createdAt: true,
        updatedAt: true,
        version: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return {
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };
  }

  async updatePassword(userId: string, dto: UpdateUserPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) throw new NotFoundException('User not found');
    if (user.password !== dto.oldPassword)
      throw new ForbiddenException('Wrong password');

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: dto.newPassword,
        version: { increment: 1 },
        updatedAt: Date.now().toString(),
      },
      select: {
        id: true,
        login: true,
        createdAt: true,
        updatedAt: true,
        version: true,
      },
    });

    return {
      ...updatedUser,
      createdAt: Number(updatedUser.createdAt),
      updatedAt: Number(updatedUser.updatedAt),
    };
  }

  async remove(userId: string) {
    await this.prisma.user.delete({ where: { id: userId } });
  }
}
