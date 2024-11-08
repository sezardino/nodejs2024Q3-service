import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/common/prisma';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    return await this.prisma.favorites.findFirst({
      include: { albums: true, artists: true, tracks: true },
    });
  }

  async addItem(id: string, type: 'track' | 'album' | 'artist') {
    const firstFavorite = await this.prisma.favorites.findFirst({
      select: { id: true },
    });

    const entityToAddConnection = { connect: { id } };

    try {
      await this.prisma.favorites.update({
        where: { id: firstFavorite.id },
        data: {
          tracks: type === 'track' ? entityToAddConnection : undefined,
          albums: type === 'album' ? entityToAddConnection : undefined,
          artists: type === 'artist' ? entityToAddConnection : undefined,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new UnprocessableEntityException('Entity not found');

      throw new Error(error);
    }
  }

  async deleteItem(id: string, type: 'track' | 'album' | 'artist') {
    const firstFavorite = await this.prisma.favorites.findFirst({
      select: { id: true },
    });

    const entityToAddDisconnection = { disconnect: { id } };

    await this.prisma.favorites.update({
      where: { id: firstFavorite.id },
      data: {
        tracks: type === 'track' ? entityToAddDisconnection : undefined,
        albums: type === 'album' ? entityToAddDisconnection : undefined,
        artists: type === 'artist' ? entityToAddDisconnection : undefined,
      },
    });
  }
}
