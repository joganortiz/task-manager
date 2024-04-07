import { Test, TestingModule } from '@nestjs/testing';
import { TokenUsersService } from './token-users.service';

describe('TokenUsersService', () => {
  let service: TokenUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenUsersService],
    }).compile();

    service = module.get<TokenUsersService>(TokenUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
