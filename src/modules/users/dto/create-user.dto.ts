import { IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
