import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/albums.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity('Favorites')
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entity: string;

  @Column()
  entityId: string;

  //   @ManyToMany(() => Artist, { onDelete: '' })
  //   @JoinColumn({ name: 'entityId' })
  //   artist: Artist;
}
