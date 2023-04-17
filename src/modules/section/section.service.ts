import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
    private userService: UserService, // private utilService: UtilService,
  ) {}
  async create(id: number, createSectionDto: CreateSectionDto) {
    const user = await this.userService.findUserById(id);
    const section = this.sectionRepository.create(createSectionDto);
    section.user = user[0];
    return await this.sectionRepository.save(section);
  }

  findAll() {
    return `This action returns all section`;
  }

  findOne(id: number) {
    return `This action returns a #${id} section`;
  }

  update(id: number, updateSectionDto: UpdateSectionDto) {
    return `This action updates a #${id} section`;
  }

  remove(id: number) {
    return `This action removes a #${id} section`;
  }
}
