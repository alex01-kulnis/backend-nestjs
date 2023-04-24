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

  async update(id: number, createSectionDto: any) {
    const section = await this.sectionRepository.findOneOrFail({
      where: { id: id },
    });
    this.sectionRepository.merge(section, createSectionDto);
    return this.sectionRepository.save(section);
  }

  async findAll() {
    return await this.sectionRepository.find({
      relations: ['user'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} section`;
  }

  patch(id: number, updateSectionDto: UpdateSectionDto) {
    return `This action updates a #${id} section`;
  }

  async remove(id: number) {
    return await this.sectionRepository.delete(id);
  }
}
