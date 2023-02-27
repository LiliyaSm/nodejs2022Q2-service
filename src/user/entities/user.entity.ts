import {
  Entity,
  Column,
  CreateDateColumn,
  VersionColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  login: string;

  @Exclude()
  @Column({ length: 200 })
  password: string;

  @VersionColumn({ type: 'numeric', default: 1 })
  version: number;

  @CreateDateColumn()
  @Transform(({ value }) => value.getTime())
  createdAt: number;

  @UpdateDateColumn()
  @Transform(({ value }) => value.getTime())
  updatedAt: number;
}
