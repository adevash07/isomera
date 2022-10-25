import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMock } from 'ts-auto-mock';

describe('UsersService', () => {
  let service: UsersService;
  let mockedUserRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .useMocker((token) => {
        if (Object.is(token, getRepositoryToken(User))) {
          return createMock<Repository<User>>();
        }
      })
      .compile();

    service = module.get<UsersService>(UsersService);
    mockedUserRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
