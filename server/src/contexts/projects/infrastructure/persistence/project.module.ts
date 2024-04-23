import { Module } from '@nestjs/common';
import { ProjectController } from '../http/controllers/project.controller';
import { InMysqlProjectRepository } from '../implementations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../sql/project.entity';
import { InMysqlUserRepository } from 'src/contexts/users/infrastructure/implementations/InMysqlUserRepository';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  controllers: [ProjectController],
  providers: [InMysqlProjectRepository, InMysqlUserRepository],
  //exports: [InMysqlProjectRepository],
})
export class ProjectModule {}
