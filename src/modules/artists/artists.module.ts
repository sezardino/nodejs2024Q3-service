import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, PrismaService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
