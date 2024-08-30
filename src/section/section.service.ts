import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SectionService {
  constructor(private dataSource: DataSource) {}

  // Get list of all tables (sections)
  async getDataSources(): Promise<string[]> {
    const result = await this.dataSource.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log(result);

    return result.map((row) => row.table_name);
  }

  // Get list of all columns (sub-sections) for a specific table (section)
  async getSectionColumns(sectionName: string): Promise<string[]> {
    const result = await this.dataSource.query(`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = '${sectionName}'
  `);
    console.log(result);

    return result.map((row) => row.column_name);
  }

  // Get specific data based on table and column name
  async getSubSectionData(
    sectionName: string,
    subSectionName: string,
  ): Promise<any[]> {
    console.log(subSectionName, sectionName);

    const result = await this.dataSource.query(`
        SELECT "Script", "${subSectionName}" FROM "${sectionName}"
        `);
    console.log(result);

    return result;
  }
}
