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
    const newUser = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: dto.password,
        createdAt: Date.now(),
        updatedAt: Date.now(),
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

    return newUser;
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

    return user;
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
        updatedAt: Date.now(),
      },
      select: {
        id: true,
        login: true,
        createdAt: true,
        updatedAt: true,
        version: true,
      },
    });

    return updatedUser;
  }

  async remove(userId: string) {
    await this.prisma.user.delete({ where: { id: userId } });
  }
}
