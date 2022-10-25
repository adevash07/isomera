import { Test } from '@nestjs/testing';
import {
  HealthCheckService,
  HealthIndicatorFunction,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { createMock } from 'ts-auto-mock';
import { AppService } from './app.service';
import { AppController } from './app.controller';

describe('App', () => {
  let service: AppService;
  let controller: AppController;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
      controllers: [AppController],
    })
      .useMocker((token) => {
        const getStatus = (key: string) => ({ [key]: { status: 'up' } });

        if (Object.is(token, HealthCheckService)) {
          return createMock<HealthCheckService>({
            check: jest
              .fn()
              .mockImplementation((indicators: HealthIndicatorFunction[]) =>
                Promise.all(indicators.map((indicator) => indicator()))
              ),
          });
        }

        if (Object.is(token, TypeOrmHealthIndicator)) {
          return createMock<TypeOrmHealthIndicator>({
            pingCheck: jest.fn().mockImplementation(getStatus),
          });
        }

        if (Object.is(token, MemoryHealthIndicator)) {
          return createMock<MemoryHealthIndicator>({
            checkHeap: jest.fn().mockImplementation(getStatus),
            checkRSS: jest.fn().mockImplementation(getStatus),
          });
        }
      })
      .compile();

    service = app.get<AppService>(AppService);
    controller = app.get<AppController>(AppController);
  });

  describe('AppService', () => {
    describe('getHello', () => {
      it('should return "Welcome to isomera!"', () => {
        expect(service.getHello()).toEqual({
          message: 'Hello World!',
        });
      });
    });
  });

  describe('AppController', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should check health', async () => {
      await expect(controller.check()).resolves.toMatchInlineSnapshot(`
      [
        {
          "db": {
            "status": "up",
          },
        },
        {
          "mem_rss": {
            "status": "up",
          },
        },
      ]
    `);
    });
  });
});
