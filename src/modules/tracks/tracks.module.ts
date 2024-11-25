import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { PrismaService } from 'src/common/prisma';

@Module({
  controllers: [TracksController],
  providers: [TracksService, PrismaService],
  exports: [TracksService],
})
export class TracksModule {}
