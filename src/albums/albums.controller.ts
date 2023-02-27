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
import { AlbumsService } from './albums.service';
import { AlbumI } from './albums.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('album')
@UseGuards(AuthGuard)
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async getAll() {
    return await this.albumsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<AlbumI> {
    return await this.albumsService.getById(id);
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumI> {
    return await this.albumsService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumI> {
    return await this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string): Promise<void> {
    await this.albumsService.deleteAlbum(id);
  }
}
