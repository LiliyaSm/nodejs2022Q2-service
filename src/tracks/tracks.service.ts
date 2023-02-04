import {
  Injectable,
  NotFoundException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { TrackI } from './tracks.interface';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TracksService {
  @Inject(forwardRef(() => FavoritesService))
  private readonly favoritesService: FavoritesService;

  private tracks = [];
  getAll(): TrackI[] {
    return this.tracks;
  }

  getById(trackId: string): TrackI {
    // 400 error
    if (!validate(trackId)) throw new BadRequestException('Id is invalid');
    const user = this.tracks.find(({ id }) => id === trackId);
    // 404 error
    if (!user) throw new NotFoundException('Track not found');
    return user;
  }

  createTrack(createTrackDto: CreateTrackDto): TrackI {
    const newTrack = {
      ...createTrackDto,
      id: uuidv4(),
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto): TrackI {
    const trackToUpdate = this.getById(id);

    const updatedTrack = {
      ...trackToUpdate,
      ...updateTrackDto,
    };
    this.tracks = this.tracks.map((track) =>
      track.id === id ? updatedTrack : track,
    );
    return updatedTrack;
  }

  deleteTrack(id: string): void {
    this.getById(id);
    this.favoritesService.deleteEntity(id, 'tracks');
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }

  deleteFromTracksArtistId(id: string) {
    this.tracks = this.tracks.map((track) => {
      if (track.artistId === id) return { ...track, artistId: null };
      return track;
    });
  }

  deleteFromTracksAlbumId(id: string) {
    this.tracks = this.tracks.map((track) => {
      if (track.albumId === id) return { ...track, albumId: null };
      return track;
    });
  }
}
