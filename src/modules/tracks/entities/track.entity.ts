import { CreateTrackDto } from '../dto/create-track.dto';

export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor(dto: CreateTrackDto) {
    this.id = crypto.randomUUID();
    this.name = dto.name;
    this.artistId = dto.artistId;
    this.albumId = dto.albumId;
    this.duration = dto.duration;
  }
}
