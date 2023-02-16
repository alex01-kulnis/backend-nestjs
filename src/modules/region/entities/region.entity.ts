import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('region')
export class RegionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //   @Column()
  //   login: string;
}
