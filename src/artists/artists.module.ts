import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
