import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from 'src/modules/role/entities/role.entity';

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

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  // @Column()
  // role: string;
}
