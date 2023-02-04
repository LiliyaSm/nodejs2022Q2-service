import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { AlbumI } from './albums.interface';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumsService {
  @Inject(forwardRef(() => TracksService))
  private readonly tracksService: TracksService;

  @Inject(forwardRef(() => FavoritesService))
  private readonly favoritesService: FavoritesService;

  private albums = [];
  getAll(): AlbumI[] {
    return this.albums;
  }

  getById(AlbumId: string): AlbumI {
    // 400 error
    if (!validate(AlbumId)) throw new BadRequestException('Id is invalid');
    const user = this.albums.find(({ id }) => id === AlbumId);
    // 404 error
    if (!user) throw new NotFoundException('Album not found');
    return user;
  }

  createAlbum(createAlbumDto: CreateAlbumDto): AlbumI {
    const newAlbum = {
      ...createAlbumDto,
      id: uuidv4(),
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto): AlbumI {
    const AlbumToUpdate = this.getById(id);

    const updatedAlbum = {
      ...AlbumToUpdate,
      ...updateAlbumDto,
    };
    this.albums = this.albums.map((album) =>
      album.id === id ? updatedAlbum : album,
    );
    return updatedAlbum;
  }

  deleteAlbum(id: string) {
    const album = this.getById(id);
    this.favoritesService.deleteEntity(id, 'albums');
    this.tracksService.deleteFromTracksAlbumId(album.id);
    this.albums = this.albums.filter((album) => album.id !== id);
  }
}
