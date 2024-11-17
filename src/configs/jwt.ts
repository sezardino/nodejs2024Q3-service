import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.get<string>('TOKEN_SECRET'),
  signOptions: { expiresIn: configService.get<string>('TOKEN_EXPIRE_TIME') },
});
