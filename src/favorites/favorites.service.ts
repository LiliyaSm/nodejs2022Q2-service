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

const services = {
  tracks: 'tracksService',
  albums: 'albumsService',
  artists: 'artistsService',
};

@Injectable()
export class FavoritesService {
  @Inject(forwardRef(() => AlbumsService))
  private readonly albumsService: AlbumsService;

  @Inject(forwardRef(() => ArtistsService))
  private readonly artistsService: ArtistsService;

  @Inject(forwardRef(() => TracksService))
  private readonly tracksService: TracksService;

  private favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAll(): FavoritesResponse {
    const result = { artists: [], albums: [], tracks: [] };
    for (const field in this.favorites) {
      result[field] = this.favorites[field].map((entityId: string) => {
        // return this[services[field]].getById(entityId);
      });
    }
    return result;
  }

  addEntityId(entityId: string, entityName: string): void {
    if (!validate(entityId)) throw new BadRequestException('Id is invalid');
    const allEntities = this[services[entityName]].getAll();
    // const entity = allEntities.find(({ id }) => id === entityId);
    // 422 error
    // if (!entity)
    // throw new UnprocessableEntityException(`${entityName} not found`);
    this.favorites[entityName].push(entityId);
  }

  deleteEntity(id: string, entity: string) {
    this.favorites[entity] = this.favorites[entity].filter(
      (entityId: string) => entityId !== id,
    );
  }
}
