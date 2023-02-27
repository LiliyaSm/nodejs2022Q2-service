import {
  Injectable,
  UnprocessableEntityException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { FavoritesResponse } from './favorites.interface';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { validate } from 'uuid';
import { Favorites } from './entities/favorites.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const services = {
  tracks: 'tracksService',
  albums: 'albumsService',
  artists: 'artistsService',
};

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  async getAll(): Promise<FavoritesResponse> {
    const result = { artists: [], albums: [], tracks: [] };
    const allFavorites = await this.favoritesRepository.find();
    for (const field in services) {
      result[field] = await Promise.all(
        allFavorites
          .filter(({ entity }) => entity === field)
          .map(async ({ entityId, entity }) => {
            return await this[services[entity]].getById(entityId);
          }),
      );
    }
    return result;
  }

  async addEntityId(entityId: string, entityName: string): Promise<void> {
    if (!validate(entityId)) throw new BadRequestException('Id is invalid');
    const allEntities = await this[services[entityName]].getAll();
    const entity = allEntities.find(({ id }) => id === entityId);
    // 422 error
    if (!entity)
      throw new UnprocessableEntityException(`${entityName} not found`);
    await this.favoritesRepository.save({ entityId, entity: entityName });
  }

  async deleteEntity(id: string) {
    await this.favoritesRepository.delete({ entityId: id });
  }
}
