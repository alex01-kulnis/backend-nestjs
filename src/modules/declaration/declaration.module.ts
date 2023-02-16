import { DeclarationEntity } from './entities/declaration.entity';
import { Module } from '@nestjs/common';
import { DeclarationService } from './declaration.service';
import { DeclarationController } from './declaration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DeclarationEntity])],
  controllers: [DeclarationController],
  providers: [DeclarationService],
})
export class DeclarationModule {}
