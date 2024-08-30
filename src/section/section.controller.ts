import { Controller, Get, Param } from '@nestjs/common';
import { SectionService } from './section.service';

@Controller()
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get('sections')
  async getDataSources(): Promise<string[]> {
    return this.sectionService.getDataSources();
  }

  @Get('sections/:section_name')
  async getSectionColumns(
    @Param('section_name') sectionName: string,
  ): Promise<string[]> {
    return this.sectionService.getSectionColumns(sectionName);
  }

  @Get('/sections/:section_name/:sub_section_name')
  async getSubSectionData(
    @Param('section_name') sectionName: string,
    @Param('sub_section_name') subSectionName: string,
  ): Promise<any[]> {
    return this.sectionService.getSubSectionData(sectionName, subSectionName);
  }
}
