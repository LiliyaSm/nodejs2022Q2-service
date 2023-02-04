import { IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
