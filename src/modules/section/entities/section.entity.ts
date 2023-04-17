import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('section')
export class Section {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  years: string;

  @Column()
  monday: string;

  @Column()
  tuesday: string;

  @Column()
  wednesday: string;

  @Column()
  thursday: string;

  @Column()
  friday: string;

  @Column()
  saturday: string;

  @Column()
  sunday: string;

  @Column()
  adress: string;

  @Column({
    nullable: true,
  })
  adress2: string;

  @Column({
    nullable: true,
  })
  adress3: string;

  @Column()
  mentor: string;

  @Column({
    nullable: true,
  })
  mentor2: string;

  @Column({
    nullable: true,
  })
  mentor3: string;

  @Column()
  description: string;

  @ManyToOne((type) => User, (user) => user.section)
  user: User;
}
