import { Test, TestingModule } from '@nestjs/testing';
import { UsersTasksService } from './users-tasks.service';

describe('UsersTasksService', () => {
  let service: UsersTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersTasksService],
    }).compile();

    service = module.get<UsersTasksService>(UsersTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
