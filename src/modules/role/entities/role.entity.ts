import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/modules/user/entities/user.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  role: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
