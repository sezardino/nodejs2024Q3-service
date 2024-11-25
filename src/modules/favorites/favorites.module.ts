import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService],
})
export class FavoritesModule {}
