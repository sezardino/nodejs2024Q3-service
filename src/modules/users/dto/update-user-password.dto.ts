import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
