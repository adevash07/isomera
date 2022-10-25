import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LoggerModule } from '../logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { createMock } from 'ts-auto-mock';

describe('AuthService', () => {
  let service: AuthService;
  let mockedUserRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        LoggerModule,
        JwtModule,
        UsersModule,
        TypeOrmModule.forFeature([User]),
      ],
      providers: [AuthService],
    })
      .useMocker((token) => {
        if (Object.is(token, getRepositoryToken(User))) {
          return createMock<Repository<User>>();
        }
      })
      .compile();

    service = module.get<AuthService>(AuthService);
    mockedUserRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
