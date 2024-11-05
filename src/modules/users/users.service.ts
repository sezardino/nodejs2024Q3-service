import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(dto: CreateUserDto) {
    const isUserExist = this.users.find((u) => u.login === dto.login);

    if (isUserExist)
      throw new BadRequestException('User with this login already exist');

    const newUser = new User(dto.login, dto.password);
    this.users = [...this.users, newUser];

    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((u) => u.id === id);

    if (!user) return new NotFoundException('User not found');

    return user;
  }

  updatePassword(userId: string, dto: UpdateUserPasswordDto) {
    const user = this.users.find((u) => u.id === userId);

    if (!user) throw new NotFoundException('User not found');
    if (user.password !== dto.oldPassword)
      throw new ForbiddenException('Wrong password');

    const updatedUser: User = { ...user, password: dto.newPassword };

    const newUsers = [
      ...this.users.filter((u) => u.id !== userId),
      updatedUser,
    ];
    this.users = newUsers;
  }

  remove(id: string) {
    const user = this.users.find((u) => u.id === id);

    if (!user) throw new NotFoundException('User not found');

    this.users = this.users.filter((u) => u.id !== id);
  }
}
