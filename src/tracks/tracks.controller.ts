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
import { TracksService } from './tracks.service';
import { TrackI } from './tracks.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async getAll() {
    return await this.tracksService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<TrackI> {
    return await this.tracksService.getById(id);
  }

  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<TrackI> {
    return await this.tracksService.createTrack(createTrackDto);
  }

  @Put(':id')
  async updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackI> {
    return await this.tracksService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string): Promise<void> {
    await this.tracksService.deleteTrack(id);
  }
}
