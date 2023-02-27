import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Favorites')
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entity: string;

  @Column()
  entityId: string;
}
