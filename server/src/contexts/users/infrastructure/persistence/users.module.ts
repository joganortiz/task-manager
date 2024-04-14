import { Module } from '@nestjs/common';
import { UsersController } from '../http/controllers';
import { InMysqlUserRepository } from '../implementations/InMysqlUserRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../sql/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [InMysqlUserRepository],
  exports: [],
})
export class UsersModule {}
