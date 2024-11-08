import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  tracks: Track[] = []

  constructor(private readonly prisma: PrismaService) { }


  async create(dto: CreateTrackDto) {
    return await this.prisma.track.create({
      data: {
        duration: dto.duration,
        name: dto.name,
        album: { connect: { id: dto.albumId } },
        artist: { connect: { id: dto.artistId } },
      }
    })
  }

  findAll() {
    return this.prisma.track.findMany();
  }

  findOne(trackId: string, exception = NotFoundException) {

    const track = this.prisma.track.findUnique({ where: { id: trackId } })

    if (!track) throw new exception('Track not found');

    return track;
  }

  async update(trackId: string, dto: UpdateTrackDto) {
    return await this.prisma.track.update({
      where: { id: trackId }, data: {
        duration: dto.duration,
        name: dto.name,
        album: { connect: { id: dto.albumId } },
        artist: { connect: { id: dto.artistId } },
      }
    })
  }

  deleteAlbum(albumId: string) {
    const updatedTracks = this.tracks.map((t) => ({
      ...t,
      albumId: t.albumId === albumId ? null : t.albumId,
    }));

    this.tracks = updatedTracks;
  }

  deleteArtist(artistId: string) {
    const updatedTracks = this.tracks.map((t) => ({
      ...t,
      artistId: t.artistId === artistId ? null : t.artistId,
    }));

    this.tracks = updatedTracks;
  }

  remove(trackId: string) {
    this.prisma.track.delete({ where: { id: trackId } })
  }
}
