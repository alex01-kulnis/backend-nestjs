import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from 'src/modules/role/entities/role.entity';
import { Section } from 'src/modules/section/entities/section.entity';
import { StatusUser } from '../enum/status-users.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    nullable: true,
  })
  organization_name: string;

  @Column({
    nullable: true,
  })
  first_name: string;

  @Column({
    nullable: true,
  })
  middle_name: string;

  @Column({
    nullable: true,
  })
  last_name: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column()
  email: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: StatusUser,
    default: StatusUser.ACTIVE,
  })
  status: StatusUser;

  @OneToMany(() => Section, (section) => section.user)
  section: Section[];

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  // @Column()
  // role: string;
}
