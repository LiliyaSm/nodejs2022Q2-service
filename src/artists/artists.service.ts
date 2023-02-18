import {
  Injectable,
  NotFoundException,
  BadRequestException,
  // Inject,
  // forwardRef,
} from '@nestjs/common';
import { ArtistI } from './artists.interface';
import { validate } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}
  // @Inject(forwardRef(() => TracksService))
  // private readonly tracksService: TracksService;

  // @Inject(forwardRef(() => FavoritesService))
  // private readonly favoritesService: FavoritesService;

  // private artists = [];
  getAll(): Promise<ArtistI[]> {
    return this.artistRepository.find();
  }

  async getById(artistId: string): Promise<Artist> {
    // 400 error
    if (!validate(artistId)) throw new BadRequestException('Id is invalid');
    const artist = await this.artistRepository.findOneBy({ id: artistId });
    // 404 error
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<ArtistI> {
    const newArtist = await this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(newArtist);
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistI> {
    const ArtistToUpdate = await this.getById(id);

    const updatedArtist = {
      ...ArtistToUpdate,
      ...updateArtistDto,
    };
    return await this.artistRepository.save(updatedArtist);
  }

  async deleteArtist(id: string) {
    const artist = await this.getById(id);
    await this.artistRepository.remove(artist);

    // this.tracksService.deleteFromTracksArtistId(artist.id);
    // this.favoritesService.deleteEntity(id, 'artists');
  }
}
