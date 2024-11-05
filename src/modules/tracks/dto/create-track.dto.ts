import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsString()
  @IsUUID()
  artistId: string;

  @IsString()
  @IsUUID()
  albumId: string;
}
