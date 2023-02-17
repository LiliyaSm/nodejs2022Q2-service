import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { Module, forwardRef } from '@nestjs/common';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { Artist } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([Artist]),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
