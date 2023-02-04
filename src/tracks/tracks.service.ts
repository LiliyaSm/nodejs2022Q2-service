import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { TrackI } from './tracks.interface';
import { v4 as uuidv4, validate } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  private tracks = [];
  getAllTracks(): TrackI[] {
    return this.tracks;
  }

  getTrackById(trackId: string): TrackI {
    // 400 error
    if (!validate(trackId)) throw new BadRequestException('Id is invalid');
    const user = this.tracks.find(({ id }) => id === trackId);
    // 404 error
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  createTrack(createTrackDto: CreateTrackDto): TrackI {
    const newTrack = {
      ...createTrackDto,
      id: uuidv4(),
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto): TrackI {
    const trackToUpdate = this.getTrackById(id);

    const updatedTrack = {
      ...trackToUpdate,
      ...updateTrackDto,
    };
    this.tracks = this.tracks.map((track) =>
      track.id === id ? updatedTrack : track,
    );
    return updatedTrack;
  }

  deleteTrack(id: string) {
    this.getTrackById(id);
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}
