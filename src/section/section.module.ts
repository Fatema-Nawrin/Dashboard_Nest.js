// src/section/section.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
// import { Section } from '../entities/section.entity';
// import { SubSection } from '../entities/subSection.entity';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
