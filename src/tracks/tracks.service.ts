import {
  Injectable,
  NotFoundException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { TrackI } from './tracks.interface';
import { validate } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  private tracks = [];
  getAll(): Promise<TrackI[]> {
    return this.trackRepository.find();
  }

  async getById(trackId: string): Promise<Track> {
    // 400 error
    if (!validate(trackId)) throw new BadRequestException('Id is invalid');
    const track = await this.trackRepository.findOneBy({ id: trackId });
    // 404 error
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<TrackI> {
    const newTrack = await this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(newTrack);
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackI> {
    const trackToUpdate = await this.getById(id);
    const updatedTrack = {
      ...trackToUpdate,
      ...updateTrackDto,
    };
    return await this.trackRepository.save(updatedTrack);
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.getById(id);
    await this.favoritesService.deleteEntity(id);
    await this.trackRepository.remove(track);
  }
}
