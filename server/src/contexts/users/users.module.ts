import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/http/controllers';
import { InMysqlUserRepository } from './infrastructure/implementations/InMysqlUserRepository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [InMysqlUserRepository],
  exports: [],
})
export class UsersModule {}
