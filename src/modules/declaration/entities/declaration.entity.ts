import { Category } from './../../category/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Declaration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Category, (category) => category.declarations)
  categories: Category[];
}
