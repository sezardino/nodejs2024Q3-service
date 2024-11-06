import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { User } from './entities/user.entity';
import { MOCK_USERS } from './users.const';

@Injectable()
export class UsersService {
  private users: User[] = MOCK_USERS;

  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUserDto) {
    // const isUserExist = this.users.find((u) => u.login === dto.login);

    // if (isUserExist)
    //   throw new BadRequestException('User with this login already exist');

    const newUser = new User(dto);
    this.users = [...this.users, newUser];

    const { password, ...restUser } = newUser;

    return restUser;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  findOne(id: string) {
    const user = this.users.find((u) => u.id === id);

    if (!user) throw new NotFoundException('User not found');

    const { password, ...restUser } = user;

    return restUser;
  }

  updatePassword(userId: string, dto: UpdateUserPasswordDto) {
    const user = this.users.find((u) => u.id === userId);

    if (!user) throw new NotFoundException('User not found');
    if (user.password !== dto.oldPassword)
      throw new ForbiddenException('Wrong password');

    const updatedUser: User = {
      ...user,
      version: ++user.version,
      updatedAt: Date.now(),
      password: dto.newPassword,
    };

    const newUsers = [
      ...this.users.filter((u) => u.id !== userId),
      updatedUser,
    ];
    this.users = newUsers;

    const { password, ...restUpdatedUser } = updatedUser;

    return restUpdatedUser;
  }

  remove(userId: string) {
    this.findOne(userId);

    this.users = this.users.filter((u) => u.id !== userId);
  }
}
