import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { JWTPayload } from 'src/types/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signup(dto: SignUpDto) {
    const { password, login } = dto;

    const user = await this.usersService.findUserForAuth(login);

    if (user) throw new ConflictException('Conflict. Login already exists');

    const passwordHash = hashSync(
      password,
      genSaltSync(Number(this.configService.get<number>('CRYPT_SALT'))),
    );

    const newUser = await this.usersService.create({
      login,
      password: passwordHash,
    });

    const token = await this.jwtService.signAsync({
      userId: newUser.id,
      login: newUser.login,
    } as JWTPayload);

    return { ...newUser, accessToken: token, refreshToken: token };
  }

  async login(dto: LoginDto) {
    const { login, password } = dto;
    const user = await this.usersService.findUserForAuth(login);

    if (!user) throw new ForbiddenException('Incorrect login or password');

    const isPasswordMatch = compareSync(password, user.password);

    if (!isPasswordMatch)
      throw new ForbiddenException('Incorrect login or password');

    const token = await this.jwtService.signAsync({
      userId: user.id,
      login: user.login,
    } as JWTPayload);

    return { accessToken: token, refreshToken: token };
  }
}
