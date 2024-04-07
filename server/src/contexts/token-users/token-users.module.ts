import { Module } from '@nestjs/common';
import { TokenUsersService } from './token-users.service';
import { TokenUsersController } from './token-users.controller';

@Module({
  controllers: [TokenUsersController],
  providers: [TokenUsersService],
})
export class TokenUsersModule {}
