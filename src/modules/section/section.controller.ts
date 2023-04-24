import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { JwtAuthGuard } from '../auth/guadrs/jsw.auth.guard';

@Controller('api/section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req: any, @Body() createSectionDto: CreateSectionDto) {
    const tokenData = req.user;
    return this.sectionService.create(+tokenData.id_user, createSectionDto);
  }

  @Get()
  findAll() {
    return this.sectionService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.sectionService.update(+id, updateUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(+id);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.patch(+id, updateSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(+id);
  }
}
