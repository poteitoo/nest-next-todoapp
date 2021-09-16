import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUserByUsernameAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.login).toBeDefined();
  });

  it('should be defined', () => {
    const user: Partial<User> = { password: 'python', username: 'momo' };
    expect(controller.login(user)).resolves.toContainEqual({
      access_token: String,
    });
  });
});
