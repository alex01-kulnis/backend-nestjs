import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('section')
export class SectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;
}
