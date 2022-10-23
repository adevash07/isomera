import { Test, TestingModule } from '@nestjs/testing';
import { WebsitesController } from './websites.controller';
import { WebsitesService } from './websites.service';
import { LoggerModule } from '../logger/logger.module';

describe('WebsitesController', () => {
  let controller: WebsitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      controllers: [WebsitesController],
      providers: [WebsitesService],
    }).compile();

    controller = module.get<WebsitesController>(WebsitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
