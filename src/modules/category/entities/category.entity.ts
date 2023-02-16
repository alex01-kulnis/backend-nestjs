import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  // @ManyToMany(() => Declaration, (declaration) => declaration.categories)
  // @JoinTable()
  // declarations: Declaration[];
}
