import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { Public } from 'src/decorators/auth';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(StatusCodes.CREATED)
  registration(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @Public()
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('/refresh')
  resetPasswordPost() {
    return '';
  }
}
