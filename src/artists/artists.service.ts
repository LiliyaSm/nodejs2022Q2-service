import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { ArtistI } from './artists.interface';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistsService {
  @Inject(forwardRef(() => TracksService))
  private readonly tracksService: TracksService;

  @Inject(forwardRef(() => FavoritesService))
  private readonly favoritesService: FavoritesService;

  private artists = [];
  getAll(): ArtistI[] {
    return this.artists;
  }

  getById(ArtistId: string): ArtistI {
    // 400 error
    if (!validate(ArtistId)) throw new BadRequestException('Id is invalid');
    const user = this.artists.find(({ id }) => id === ArtistId);
    // 404 error
    if (!user) throw new NotFoundException('Artist not found');
    return user;
  }

  createArtist(createArtistDto: CreateArtistDto): ArtistI {
    const newArtist = {
      ...createArtistDto,
      id: uuidv4(),
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto): ArtistI {
    const ArtistToUpdate = this.getById(id);

    const updatedArtist = {
      ...ArtistToUpdate,
      ...updateArtistDto,
    };
    this.artists = this.artists.map((artist) =>
      artist.id === id ? updatedArtist : artist,
    );
    return updatedArtist;
  }

  deleteArtist(id: string) {
    const artist = this.getById(id);
    this.tracksService.deleteFromTracksArtistId(artist.id);
    this.favoritesService.deleteEntity(id, 'artists');
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
