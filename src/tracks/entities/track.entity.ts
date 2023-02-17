import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  AfterRemove,
  EntityManager,
  JoinColumn,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';

@Entity('Track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  albumId: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;
}

//   @ManyToOne(() => Album, { onDelete: 'SET NULL' })
//   album: Album;
