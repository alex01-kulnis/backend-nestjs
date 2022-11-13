import { Declaration } from './../../declaration/entities/declaration.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @ManyToMany(() => Declaration, (declaration) => declaration.categories)
  @JoinTable()
  declarations: Declaration[];
}
