import { Module } from '@nestjs/common';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
  imports: [TracksModule],
})
export class AlbumsModule {}
