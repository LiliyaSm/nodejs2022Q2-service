import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist
  @IsOptional()
  @IsString()
  albumId: string | null; // refers to Album
  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
