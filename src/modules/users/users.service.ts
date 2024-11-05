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

    const newUser = new User(dto);
    this.users = [...this.users, newUser];

    const { password, ...restUser } = newUser;

    return restUser;
  }

  findAll() {
    return this.users.map(({ password, ...restUser }) => ({ ...restUser }));
  }

  findOne(id: string) {
    const user = this.users.find((u) => u.id === id);

    if (!user) return new NotFoundException('User not found');

    const { password, ...restUser } = user;

    return restUser;
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
