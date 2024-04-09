import { Test, TestingModule } from '@nestjs/testing';
import { UsersTasksController } from './users-tasks.controller';
import { UsersTasksService } from './users-tasks.service';

describe('UsersTasksController', () => {
  let controller: UsersTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersTasksController],
      providers: [UsersTasksService],
    }).compile();

    controller = module.get<UsersTasksController>(UsersTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
