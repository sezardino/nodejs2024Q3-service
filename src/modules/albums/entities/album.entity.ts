import { CreateAlbumDto } from '../dto/create-album.dto';

export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor(dto: CreateAlbumDto) {
    this.id = crypto.randomUUID();
    this.name = dto.name;
    this.year = dto.year;
    this.artistId = dto.artistId;
  }
}
