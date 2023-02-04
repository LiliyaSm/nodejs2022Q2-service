import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumI } from './albums.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAll() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): AlbumI {
    return this.albumsService.getById(id);
  }

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): AlbumI {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): AlbumI {
    return this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string): void {
    this.albumsService.deleteAlbum(id);
  }
}
