import { Test, TestingModule } from '@nestjs/testing';
import { SectionService } from './section.service';
import { DataSource } from 'typeorm';

describe('SectionService', () => {
  let service: SectionService;
  let mockDataSource: Partial<DataSource>;

  beforeEach(async () => {
    mockDataSource = {
      query: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<SectionService>(SectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDataSources', () => {
    it('should return a list of table names', async () => {
      const expectedTables = ['table1', 'table1'];
      (mockDataSource.query as jest.Mock).mockResolvedValue([
        { table_name: 'table1' },
        { table_name: 'table1' },
      ]);

      const result = await service.getDataSources();

      expect(result).toEqual(expectedTables);
    });
    it('should throw an error if the query fails', async () => {
      (mockDataSource.query as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      await expect(service.getDataSources()).rejects.toThrow(
        'Failed to fetch data sources',
      );
    });
  });

  describe('getSectionColumns', () => {
    it('should return a list of columns for a specific section', async () => {
      const sectionName = 'BSE';
      const expectedColumns = ['Script', 'Close'];

      (mockDataSource.query as jest.Mock).mockResolvedValue([
        { column_name: 'Script' },
        { column_name: 'Close' },
      ]);

      const result = await service.getSectionColumns(sectionName);

      expect(result).toEqual(expectedColumns);
    });

    it('should handle empty result', async () => {
      const sectionName = 'NSE';

      (mockDataSource.query as jest.Mock).mockResolvedValue([]);

      await expect(service.getSectionColumns(sectionName)).rejects.toThrow(
        'No columns found for NSE',
      );
    });
  });

  describe('getSubSectionData', () => {
    it('should return data for a given section and sub-section', async () => {
      const expectedData = [
        { Script: 'Gail', Close: 150 },
        { Script: 'COAL', Close: 500 },
      ];
      (mockDataSource.query as jest.Mock).mockResolvedValue(expectedData);

      const result = await service.getSubSectionData('BSE', 'Close');

      expect(result).toEqual(expectedData);
    });

    it('should handle empty result', async () => {
      (mockDataSource.query as jest.Mock).mockResolvedValue([]);

      await expect(
        service.getSubSectionData('BSE', 'InvalidColumn'),
      ).rejects.toThrow('No data found for InvalidColumn');
    });
  });
});
