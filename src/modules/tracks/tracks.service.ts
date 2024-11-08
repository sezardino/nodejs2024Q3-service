import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTrackDto) {
    return await this.prisma.track.create({
      data: {
        duration: dto.duration,
        name: dto.name,
        album: dto.albumId ? { connect: { id: dto.albumId } } : undefined,
        artist: dto.artistId ? { connect: { id: dto.artistId } } : undefined,
      },
    });
  }

  findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(trackId: string, exception = NotFoundException) {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });

    if (!track) throw new exception('Track not found');

    return track;
  }

  async update(trackId: string, dto: UpdateTrackDto) {
    return await this.prisma.track.update({
      where: { id: trackId },
      data: {
        duration: dto.duration,
        name: dto.name,
        album: dto.albumId ? { connect: { id: dto.albumId } } : undefined,
        artist: dto.artistId ? { connect: { id: dto.artistId } } : undefined,
      },
    });
  }

  async remove(trackId: string) {
    await this.prisma.track.delete({ where: { id: trackId } });
  }
}
