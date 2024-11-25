import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsString()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;

  @IsString()
  @IsUUID()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;
}
