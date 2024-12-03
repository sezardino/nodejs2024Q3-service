import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { Public } from 'src/decorators/auth';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(StatusCodes.CREATED)
  registration(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  resetPasswordPost(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }
}
