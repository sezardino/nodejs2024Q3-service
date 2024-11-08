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
        artist: { connect: { id: dto.artistId } }
      }
    })

    return newAlbum;
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(albumId: string, exception = NotFoundException) {
    const album = await this.prisma.album.findUnique({ where: { id: albumId } })

    if (!album) throw new exception('Album not found');

    return album;
  }

  update(albumId: string, dto: UpdateAlbumDto) {
    const updatedAlbum = this.prisma.album.update({
      where: { id: albumId },
      data: {
        name: dto.name,
        year: dto.year,
        artist: dto.artistId ? { connect: { id: dto.artistId } } : undefined
      }
    })

    return updatedAlbum;
  }

  remove(albumId: string) {
    this.prisma.album.delete({ where: { id: albumId } })
  }
}
