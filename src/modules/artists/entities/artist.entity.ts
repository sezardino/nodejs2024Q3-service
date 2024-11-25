import { CreateArtistDto } from '../dto/create-artist.dto';

export class Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(dto: CreateArtistDto) {
    this.id = crypto.randomUUID();
    this.name = dto.name;
    this.grammy = dto.grammy;
  }
}
