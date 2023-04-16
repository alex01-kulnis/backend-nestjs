import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UtilService } from '../util/util.service';
import { CreateUserDto } from './dto/create-user.dto';
import { StatusUser } from './enum/status-users.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private utilService: UtilService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    this.userRepository.save(user);
    return user;
  }

  async findInactiveUsers() {
    return await this.userRepository.find({
      where: {
        status: StatusUser.INACTIVE,
      },
    });
  }

  async findUserByField(field: string, searchTerm: string) {
    const query = this.userRepository.createQueryBuilder('user');
    if (searchTerm) {
      query.where(`user.${field} LIKE :searchTerm`, {
        searchTerm: `%${searchTerm}%`,
      });
    }
    return await query.getRawOne();
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findUserById(id: number) {
    return await this.userRepository.find({
      where: {
        id: id,
      },
    });
  }

  async patch(id: number, updateUserDto: UpdateUserDto) {
    if (
      updateUserDto.hasOwnProperty('password') &&
      updateUserDto.password !== null &&
      updateUserDto.password !== undefined
    ) {
      const hashPassword = this.utilService.hashString(updateUserDto.password);
      updateUserDto['password'] = hashPassword;
    }
    return await this.userRepository.update(id, updateUserDto);
  }

  async update(id: number, updateUserDto: any) {
    const user = await this.userRepository.findOneOrFail({ where: { id: id } });
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
