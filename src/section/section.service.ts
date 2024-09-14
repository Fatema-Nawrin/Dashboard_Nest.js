import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SectionService {
  constructor(private dataSource: DataSource) {}

  // Get list of all tables (sections)
  async getDataSources(): Promise<string[]> {
    try {
      const result = await this.dataSource.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);
      return result.map((row) => row.table_name);
    } catch (error) {
      console.error(error);

      throw new Error('Failed to fetch data sources');
    }
  }

  // Get list of all columns (sub-sections) for a specific table (section)
  async getSectionColumns(sectionName: string): Promise<string[]> {
    try {
      const result = await this.dataSource.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = '${sectionName}'
      `);
      if (result.length === 0) {
        throw new Error(`No columns found for ${sectionName}`);
      }

      return result.map((row) => row.column_name);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getSubSectionData(
    sectionName: string,
    subSectionName: string,
  ): Promise<any[]> {
    try {
      console.log(subSectionName, sectionName);

      const result = await this.dataSource.query(`
          SELECT "Script", "${subSectionName}" FROM "${sectionName}"
          `);
      console.log(result);

      if (result.length === 0) {
        throw new Error(`No data found for ${subSectionName}`);
      }

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
