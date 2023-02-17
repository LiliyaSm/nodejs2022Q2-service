// import { Album } from 'src/album/entity/album.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('Artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;

  //   @OneToMany(() => Album, (album) => album.artistId)
  //   albums: Album;
}
