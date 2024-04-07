import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/TypeOrmClientFactory';
import { UsersModule } from './contexts/users/users.module';
import { TokenUsersModule } from './contexts/token-users/token-users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV?.trim()}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    UsersModule,
    TokenUsersModule,
  ],
})
export class AppModule {}
