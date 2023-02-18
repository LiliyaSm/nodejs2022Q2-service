import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { Module, forwardRef } from '@nestjs/common';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
