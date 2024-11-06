import { Injectable, NotFoundException } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { MOCK_ALBUMS } from './albums.const';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private albums: Album[] = MOCK_ALBUMS;

  constructor(private readonly tracksService: TracksService) {}

  create(dto: CreateAlbumDto) {
    const newAlbum = new Album(dto);

    this.albums = [...this.albums, newAlbum];

    return newAlbum;
  }

  findAll() {
    return this.albums;
  }

  findOne(albumId: string, exception = NotFoundException) {
    const album = this.albums.find((t) => t.id === albumId);

    if (!album) throw new exception('Album not found');

    return album;
  }

  update(albumId: string, dto: UpdateAlbumDto) {
    const album = this.findOne(albumId);

    const updatedAlbum = { ...album, ...dto };

    this.albums = [
      ...this.albums.filter((t) => t.id !== albumId),
      updatedAlbum,
    ];

    return updatedAlbum;
  }

  deleteArtist(artistId: string) {
    const updatedAlbums = this.albums.map((t) => ({
      ...t,
      artistId: t.artistId === artistId ? null : t.artistId,
    }));

    this.albums = updatedAlbums;
  }

  remove(albumId: string) {
    this.findOne(albumId);

    this.albums = this.albums.filter((t) => t.id !== albumId);

    this.tracksService.deleteAlbum(albumId);
  }
}
