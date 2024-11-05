import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  create(dto: CreateTrackDto) {
    const newTrack = new Track(dto);

    this.tracks = [...this.tracks, newTrack];

    return newTrack;
  }

  findAll() {
    return this.tracks;
  }

  findOne(trackId: string) {
    const track = this.tracks.find((t) => t.id === trackId);

    if (!track) throw new NotFoundException('Track not found');

    return track;
  }

  update(trackId: string, dto: UpdateTrackDto) {
    const track = this.findOne(trackId);

    const updatedTrack = { ...track, ...dto };

    this.tracks = [
      ...this.tracks.filter((t) => t.id !== trackId),
      updatedTrack,
    ];

    return updatedTrack;
  }

  remove(trackId: string) {
    this.findOne(trackId);

    this.tracks = this.tracks.filter((t) => t.id !== trackId);
  }
}
