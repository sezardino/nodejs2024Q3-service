import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(dto: CreateUserDto) {
    this.login = dto.login;
    this.password = dto.password;
    this.id = crypto.randomUUID();
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
