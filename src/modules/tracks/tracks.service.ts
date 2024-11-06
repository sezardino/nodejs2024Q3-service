import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { MOCK_TRACKS } from './tracks.const';

@Injectable()
export class TracksService {
  private tracks: Track[] = MOCK_TRACKS;

  create(dto: CreateTrackDto) {
    const newTrack = new Track(dto);

    this.tracks = [...this.tracks, newTrack];

    return newTrack;
  }

  findAll() {
    return this.tracks;
  }

  findOne(trackId: string, exception = NotFoundException) {
    const track = this.tracks.find((t) => t.id === trackId);

    if (!track) throw new exception('Track not found');

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

  deleteAlbum(albumId: string) {
    const updatedTracks = this.tracks.map((t) => ({
      ...t,
      albumId: t.albumId === albumId ? null : t.albumId,
    }));

    this.tracks = updatedTracks;
  }

  deleteArtist(artistId: string) {
    const updatedTracks = this.tracks.map((t) => ({
      ...t,
      artistId: t.artistId === artistId ? null : t.artistId,
    }));

    this.tracks = updatedTracks;
  }

  remove(trackId: string) {
    this.findOne(trackId);

    this.tracks = this.tracks.filter((t) => t.id !== trackId);
  }
}
