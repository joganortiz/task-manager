import { Test, TestingModule } from '@nestjs/testing';
import { TokenUsersController } from './token-users.controller';
import { TokenUsersService } from './token-users.service';

describe('TokenUsersController', () => {
  let controller: TokenUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenUsersController],
      providers: [TokenUsersService],
    }).compile();

    controller = module.get<TokenUsersController>(TokenUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
