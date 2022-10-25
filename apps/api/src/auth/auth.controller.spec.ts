// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { LoggerService } from '../logger/logger.service';
// import { JwtService } from '@nestjs/jwt';
// import { UsersModule } from '../users/users.module';
// import { User } from '../users/entities/user.entity';
// import { createMock } from 'ts-auto-mock';
// import { Role } from '../users/enums/role.enum';
// import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { UsersService } from '../users/users.service';
//
// describe('AuthController', () => {
//   let controller: AuthController;
//   let mockedUserRepository: jest.Mocked<Repository<User>>;
//   let mockedAuthService: jest.Mocked<AuthService>;
//
//   let mockedUserService: jest.Mocked<UsersService>;
//   let mockedJwtService: jest.Mocked<JwtService>;
//
//   const user = createMock<Omit<User, 'password'>>({
//     id: 'aaa',
//     name: 'John Doe',
//     email: 'john@doe.me',
//     isActive: true,
//     roles: [Role.standard],
//   }) as User;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [UsersModule, TypeOrmModule.forFeature([User])],
//       controllers: [AuthController],
//       providers: [AuthService, LoggerService],
//     })
//       .useMocker((token) => {
//         if (Object.is(token, AuthService)) {
//           return createMock<AuthService>();
//         }
//         if (Object.is(token, getRepositoryToken(User))) {
//           return createMock<Repository<User>>();
//         }
//         if (Object.is(token, UsersService)) {
//           return createMock<UsersService>();
//         }
//         if (Object.is(token, JwtService)) {
//           return createMock<JwtService>();
//         }
//       })
//       .compile();
//
//     controller = module.get<AuthController>(AuthController);
//     mockedAuthService = module.get<AuthService, jest.Mocked<AuthService>>(
//       AuthService
//     );
//     mockedUserRepository = module.get(getRepositoryToken(User));
//     mockedUserService = module.get<UsersService, jest.Mocked<UsersService>>(
//       UsersService
//     );
//     mockedJwtService = module.get<JwtService, jest.Mocked<JwtService>>(
//       JwtService
//     );
//   });
//
//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from 'ts-auto-mock';

import { User } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let controller: AuthController;
  let mockedAuthService: jest.Mocked<AuthService>;
  const user = createMock<Omit<User, 'password'>>({
    name: 'John Doe',
    email: 'john@doe.me',
  }) as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker((token) => {
        if (Object.is(token, AuthService)) {
          return createMock<AuthService>();
        }
      })
      .compile();

    controller = module.get<AuthController>(AuthController);
    mockedAuthService = module.get<AuthService, jest.Mocked<AuthService>>(
      AuthService
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a new user', async () => {
    const register = {
      name: 'John Doe',
      email: 'john@doe.me',
      password: 'Pa$$w0rd',
    };

    mockedAuthService.register.mockResolvedValue(
      createMock<Omit<User, 'password'>>({
        email: register.email,
        name: register.name,
      }) as User
    );

    await expect(controller.register(register)).resolves.not.toHaveProperty(
      'password'
    );
  });

  it('should log in an user', async () => {
    await expect(controller.login(user)).resolves.not.toHaveProperty(
      'password'
    );
  });

  it('should got me logged', () => {
    expect(controller.me(user)).toEqual(user);
  });
});
