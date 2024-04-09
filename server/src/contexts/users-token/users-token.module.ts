import { Module } from '@nestjs/common';
import { UsersTokenService } from './users-token.service';
import { UsersTokenController } from './users-token.controller';

@Module({
  controllers: [UsersTokenController],
  providers: [UsersTokenService],
})
export class UsersTokenModule {}
