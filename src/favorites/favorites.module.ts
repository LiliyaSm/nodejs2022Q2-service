import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { Module, forwardRef } from '@nestjs/common';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './entities/favorites.entities';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    TypeOrmModule.forFeature([Favorites]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
