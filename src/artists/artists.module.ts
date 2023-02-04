import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { Module } from '@nestjs/common';
import { TracksModule } from '../tracks/tracks.module';
@Module({
  imports: [TracksModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
