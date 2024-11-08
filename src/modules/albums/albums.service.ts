import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAlbumDto) {
    const newAlbum = await this.prisma.album.create({
      data: {
        name: dto.name,
        year: dto.year,
        artist: dto.artistId ? { connect: { id: dto.artistId } } : undefined,
      },
    });

    return newAlbum;
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(albumId: string, exception = NotFoundException) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });

    if (!album) throw new exception('Album not found');

    return album;
  }

  async update(albumId: string, dto: UpdateAlbumDto) {
    const updatedAlbum = await this.prisma.album.update({
      where: { id: albumId },
      data: {
        name: dto.name,
        year: dto.year,
        artist: dto.artistId ? { connect: { id: dto.artistId } } : undefined,
      },
    });

    return updatedAlbum;
  }

  async remove(albumId: string) {
    await this.prisma.album.delete({ where: { id: albumId } });
  }
}
