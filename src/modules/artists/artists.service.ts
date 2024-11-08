import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateArtistDto) {
    return await this.prisma.artist.create({
      data: {
        name: dto.name,
        grammy: dto.grammy
      },
    })
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(artistId: string, exception = NotFoundException) {
    const artist = await this.prisma.artist.findUnique({ where: { id: artistId } })

    if (!artist) throw new exception('Artist not found');

    return artist;
  }

  async update(artistId: string, dto: UpdateArtistDto) {
    const updatedArtist = await this.prisma.artist.update({ where: { id: artistId }, data: { name: dto.name, grammy: dto.grammy } })


    return updatedArtist;
  }

  remove(artistId: string) {
    this.prisma.artist.delete({ where: { id: artistId } })
  }
}
