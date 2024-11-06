import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { Favorite } from './entities/favorite.entity';
import { MOCK_FAVORITES } from './favorites.const';

@Injectable()
export class FavoritesService {
  private favorites: Favorite = MOCK_FAVORITES;

  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
  ) {}

  get() {
    const tracks = this.tracksService
      .findAll()
      .filter((t) => this.favorites.tracks.includes(t.id))
      .filter(Boolean);
    const albums = this.albumsService
      .findAll()
      .filter((t) => this.favorites.albums.includes(t.id))
      .filter(Boolean);
    const artist = this.artistsService
      .findAll()
      .filter((t) => this.favorites.artists.includes(t.id))
      .filter(Boolean);

    return { tracks, albums, artist };
  }

  addTrack(trackId: string) {
    this.tracksService.findOne(trackId, UnprocessableEntityException);

    const inList = this.favorites.tracks.includes(trackId);

    if (inList) throw new BadRequestException('Track already in list');

    this.favorites = {
      ...this.favorites,
      tracks: [...this.favorites.tracks, trackId],
    };
  }

  deleteTrack(trackId: string) {
    const inList = this.favorites.tracks.includes(trackId);

    if (!inList) throw new NotFoundException('Track not found');

    this.favorites = {
      ...this.favorites,
      tracks: this.favorites.tracks.filter((t) => t !== trackId),
    };
  }

  addAlbum(albumId: string) {
    this.albumsService.findOne(albumId, UnprocessableEntityException);

    const inList = this.favorites.tracks.includes(albumId);

    if (inList) throw new BadRequestException('Album already in list');

    this.favorites = {
      ...this.favorites,
      albums: [...this.favorites.tracks, albumId],
    };
  }

  deleteAlbum(albumId: string) {
    const inList = this.favorites.albums.includes(albumId);

    if (!inList) throw new NotFoundException('Album not found');

    this.favorites = {
      ...this.favorites,
      albums: this.favorites.tracks.filter((t) => t !== albumId),
    };
  }

  addArtist(artistId: string) {
    this.artistsService.findOne(artistId, UnprocessableEntityException);

    const inList = this.favorites.tracks.includes(artistId);

    if (inList) throw new BadRequestException('Artist already in list');

    this.favorites = {
      ...this.favorites,
      artists: [...this.favorites.tracks, artistId],
    };
  }

  deleteArtist(artistId: string) {
    const inList = this.favorites.artists.includes(artistId);

    if (!inList) throw new NotFoundException('Track not found');

    this.favorites = {
      ...this.favorites,
      artists: this.favorites.artists.filter((t) => t !== artistId),
    };
  }
}
