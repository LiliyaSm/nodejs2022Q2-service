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
  async getAll(): Promise<FavoritesResponse> {
    return await this.favoritesService.getAll();
  }

  @Post('/:entity/:id')
  async addEntityId(
    @Param('id') id: string,
    @Param('entity') entity: 'artist' | 'track' | 'album',
  ): Promise<void> {
    await this.favoritesService.addEntityId(id, requests[entity]);
  }

  @Delete('/:entity/:id')
  @HttpCode(204)
  async deleteEntity(
    @Param('id') id: string,
    @Param('entity') entity: 'artist' | 'track' | 'album',
  ): Promise<void> {
    await this.favoritesService.deleteEntity(id, requests[entity]);
  }
}
