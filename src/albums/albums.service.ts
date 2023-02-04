import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { AlbumI } from './albums.interface';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  @Inject(TracksService)
  private readonly tracksService: TracksService;

  private albums = [];
  getAllAlbums(): AlbumI[] {
    return this.albums;
  }

  getAlbumById(AlbumId: string): AlbumI {
    // 400 error
    if (!validate(AlbumId)) throw new BadRequestException('Id is invalid');
    const user = this.albums.find(({ id }) => id === AlbumId);
    // 404 error
    if (!user) throw new NotFoundException('User not found');
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
    const AlbumToUpdate = this.getAlbumById(id);

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
    const album = this.getAlbumById(id);
    this.tracksService.deleteFromTracksAlbumId(album.id);
    const test = this.tracksService.getAllTracks();
    console.log('test', test);
    this.albums = this.albums.filter((album) => album.id !== id);
  }
}
