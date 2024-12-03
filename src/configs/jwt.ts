import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.get<string>('JWT_SECRET_KEY'),
  signOptions: { expiresIn: configService.get<string>('TOKEN_EXPIRE_TIME') },
});
