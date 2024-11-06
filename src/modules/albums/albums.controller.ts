import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateAlbumDto) {
    return this.albumsService.create(dto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateAlbumDto) {
    return this.albumsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.remove(id);
  }
}
