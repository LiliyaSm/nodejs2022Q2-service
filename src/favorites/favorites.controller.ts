import { Controller, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './favorites.interface';

const requests = {
  track: 'tracks',
  album: 'albums',
  artist: 'artists',
};

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll(): FavoritesResponse {
    return this.favoritesService.getAll();
  }

  @Post('/:entity/:id')
  addEntityId(
    @Param('id') id: string,
    @Param('entity') entity: 'artist' | 'track' | 'album',
  ): void {
    return this.favoritesService.addEntityId(id, requests[entity]);
  }
}
