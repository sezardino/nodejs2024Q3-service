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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateArtistDto) {
    return this.artistsService.create(dto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.remove(id);
  }
}
