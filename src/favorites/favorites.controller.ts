import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './favorites.interface';
import { AuthGuard } from '../auth/auth.guard';

const requests = {
  track: 'tracks',
  album: 'albums',
  artist: 'artists',
};

@Controller('favs')
@UseGuards(AuthGuard)
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
  async deleteEntity(@Param('id') id: string): Promise<void> {
    await this.favoritesService.deleteEntity(id);
  }
}
