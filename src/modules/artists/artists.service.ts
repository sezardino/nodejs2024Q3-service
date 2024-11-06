import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { MOCK_ARTISTS } from './artists.const';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = MOCK_ARTISTS;

  constructor(
    private readonly tracksService: TracksService,
    private readonly albumService: AlbumsService,
  ) {}

  create(dto: CreateArtistDto) {
    const newArtist = new Artist(dto);

    this.artists = [...this.artists, newArtist];

    return newArtist;
  }

  findAll() {
    return this.artists;
  }

  findOne(artistId: string, exception = NotFoundException) {
    const artist = this.artists.find((a) => a.id === artistId);

    if (!artist) throw new exception('Artist not found');

    return artist;
  }

  update(artistId: string, dto: UpdateArtistDto) {
    const artist = this.findOne(artistId);

    const updatedArtist = { ...artist, ...dto };

    this.artists = [
      ...this.artists.filter((t) => t.id !== artistId),
      updatedArtist,
    ];

    return updatedArtist;
  }

  remove(artistId: string) {
    this.findOne(artistId);

    this.artists = this.artists.filter((a) => a.id !== artistId);
    this.tracksService.deleteArtist(artistId);
    this.albumService.deleteArtist(artistId);
  }
}
