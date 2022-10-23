import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import { LoggerModule } from '../logger/logger.module';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.healthCheck()).toEqual({ message: 'up' });
    });
  });
});
