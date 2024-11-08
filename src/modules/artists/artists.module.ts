import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, PrismaService],
  exports: [ArtistsService],
  imports: [TracksModule, AlbumsModule],
})
export class ArtistsModule {}
