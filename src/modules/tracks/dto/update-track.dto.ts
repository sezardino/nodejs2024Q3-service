import { IsString, IsNumber, IsUUID } from 'class-validator';

export class UpdateTrackDto {
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
