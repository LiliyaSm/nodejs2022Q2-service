import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { AlbumI } from './albums.interface';
import { validate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/albums.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}
  async getAll(): Promise<AlbumI[]> {
    return await this.albumRepository.find();
  }

  async getById(albumId: string): Promise<Album> {
    // 400 error
    if (!validate(albumId)) throw new BadRequestException('Id is invalid');
    const album = await this.albumRepository.findOneBy({ id: albumId });
    // 404 error
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<AlbumI> {
    const newAlbum = await this.albumRepository.create(createAlbumDto);
    return await this.albumRepository.save(newAlbum);
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumI> {
    const AlbumToUpdate = await this.getById(id);

    const updatedAlbum = {
      ...AlbumToUpdate,
      ...updateAlbumDto,
    };
    return await this.albumRepository.save(updatedAlbum);
  }

  async deleteAlbum(id: string) {
    const album = await this.getById(id);
    await this.favoritesService.deleteEntity(id);
    await this.albumRepository.remove(album);
  }
}
