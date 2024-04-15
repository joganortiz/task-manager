import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/TypeOrmClientFactory';
import { UsersModule } from './contexts/users/infrastructure/persistence/users.module';
import { ProjectModule } from './contexts/project/infrastructure/persistence/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV?.trim()}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    UsersModule,
    ProjectModule,
  ],
})
export class AppModule {}
