import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { ArtistI } from './artists.interface';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class ArtistsService {
  @Inject(TracksService)
  private readonly tracksService: TracksService;

  private artists = [];
  getAllArtists(): ArtistI[] {
    return this.artists;
  }

  getArtistById(ArtistId: string): ArtistI {
    // 400 error
    if (!validate(ArtistId)) throw new BadRequestException('Id is invalid');
    const user = this.artists.find(({ id }) => id === ArtistId);
    // 404 error
    if (!user) throw new NotFoundException('User not found');
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
    const ArtistToUpdate = this.getArtistById(id);

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
    const artist = this.getArtistById(id);
    this.tracksService.deleteFromTracksArtistId(artist.id);
    const test = this.tracksService.getAllTracks();
    console.log('test', test);
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
