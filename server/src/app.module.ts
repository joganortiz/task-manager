import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/TypeOrmClientFactory';
import { UsersModule } from './contexts/users/users.module';
import { UsersTokenModule } from './contexts/users-token/users-token.module';
import { TasksModule } from './contexts/tasks/tasks.module';
import { UsersTasksModule } from './contexts/users-tasks/users-tasks.module';
import { NotesModule } from './contexts/notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV?.trim()}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    UsersModule,
    UsersTokenModule,
    TasksModule,
    UsersTasksModule,
    NotesModule,
  ],
})
export class AppModule {}
