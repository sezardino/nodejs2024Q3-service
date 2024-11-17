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
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly accessJwtService: JwtService,
    private readonly refreshJwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
    this.refreshJwtService = new JwtService({
      secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      signOptions: {
        expiresIn: '30d',
      },
    });
  }

  private async generateTokens(payload: JWTPayload) {
    const accessToken = await this.accessJwtService.signAsync(payload);
    const refreshToken = await this.refreshJwtService.signAsync(payload);

    return { accessToken, refreshToken };
  }

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

    const tokens = this.generateTokens({
      userId: newUser.id,
      login: newUser.login,
    });

    return { ...newUser, ...tokens };
  }

  async login(dto: LoginDto) {
    const { login, password } = dto;
    const user = await this.usersService.findUserForAuth(login);

    if (!user) throw new ForbiddenException('Incorrect login or password');

    const isPasswordMatch = compareSync(password, user.password);

    if (!isPasswordMatch)
      throw new ForbiddenException('Incorrect login or password');

    const tokens = this.generateTokens({
      userId: user.id,
      login: user.login,
    });

    return tokens;
  }

  async refreshToken(dto: RefreshTokenDto) {
    try {
      const payload = await this.refreshJwtService.verifyAsync<JWTPayload>(
        dto.refreshToken,
      );

      return await this.generateTokens({
        login: payload.login,
        userId: payload.userId,
      });
    } catch (error) {
      console.log(error);
      return { error };
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}
