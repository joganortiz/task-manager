import { Module } from '@nestjs/common';
import { UsersTasksService } from './users-tasks.service';
import { UsersTasksController } from './users-tasks.controller';

@Module({
  controllers: [UsersTasksController],
  providers: [UsersTasksService],
})
export class UsersTasksModule {}
