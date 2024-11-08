import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, PrismaService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
