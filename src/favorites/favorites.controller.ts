import { Controller, Get, Param, Post, Delete, HttpCode } from '@nestjs/common';
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
    this.favoritesService.addEntityId(id, requests[entity]);
  }

  @Delete('/:entity/:id')
  @HttpCode(204)
  deleteEntity(
    @Param('id') id: string,
    @Param('entity') entity: 'artist' | 'track' | 'album',
  ) {
    this.favoritesService.deleteEntity(id, requests[entity]);
  }
}
