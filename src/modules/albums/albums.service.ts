import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  create(dto: CreateAlbumDto) {
    const newAlbum = new Album(dto);

    this.albums = [...this.albums, newAlbum];

    return newAlbum;
  }

  findAll() {
    return this.albums;
  }

  findOne(albumId: string) {
    const album = this.albums.find((t) => t.id === albumId);

    if (!album) throw new NotFoundException('Album not found');

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

  remove(albumId: string) {
    this.findOne(albumId);

    this.albums = this.albums.filter((t) => t.id !== albumId);
  }
}
