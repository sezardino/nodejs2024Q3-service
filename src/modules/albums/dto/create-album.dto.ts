import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsString()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
