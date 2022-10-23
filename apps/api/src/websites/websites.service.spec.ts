import { Test, TestingModule } from '@nestjs/testing';
import { WebsitesService } from './websites.service';
import { LoggerModule } from '../logger/logger.module';

describe('WebsitesService', () => {
  let service: WebsitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [WebsitesService],
    }).compile();

    service = module.get<WebsitesService>(WebsitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
