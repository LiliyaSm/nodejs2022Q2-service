import { ArtistI } from '../artists/artists.interface';
import { AlbumI } from '../albums/albums.interface';
import { TrackI } from '../tracks/tracks.interface';

export interface FavoritesI {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: ArtistI[];
  albums: AlbumI[];
  tracks: TrackI[];
}
