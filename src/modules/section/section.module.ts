import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Section]), UserModule, AuthModule],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
