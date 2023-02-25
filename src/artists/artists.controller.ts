import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistI } from './artists.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('artist')
@UseGuards(AuthGuard)
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async getAll() {
    return await this.artistsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ArtistI> {
    return await this.artistsService.getById(id);
  }

  @Post()
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistI> {
    return await this.artistsService.createArtist(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistI> {
    return await this.artistsService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string): Promise<void> {
    await this.artistsService.deleteArtist(id);
  }
}
