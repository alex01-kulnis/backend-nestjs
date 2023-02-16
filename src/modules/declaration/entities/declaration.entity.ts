import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('declaration')
export class DeclarationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToMany(() => Category, (category) => category.declarations)
  // categories: Category[];
}
