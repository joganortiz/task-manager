import { Test, TestingModule } from '@nestjs/testing';
import { UsersTokenController } from './users-token.controller';
import { UsersTokenService } from './users-token.service';

describe('UsersTokenController', () => {
  let controller: UsersTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersTokenController],
      providers: [UsersTokenService],
    }).compile();

    controller = module.get<UsersTokenController>(UsersTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
