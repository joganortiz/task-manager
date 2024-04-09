import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV?.trim()}.env`,
});

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: configService.get('MYSQL_DB_HOST'),
  port: configService.get('MYSQL_DB_PORT'),
  username: configService.get('MYSQL_DB_USER'),
  password: configService.get('MYSQL_DB_PASSWORD'),
  database: configService.get('MYSQL_DB_NAME'),
  entities: [
    __dirname + '/../contexts/**/**/infrastructure/sql/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [],
  //migrationsTableName: 'task_manager_migrations',
  connectorPackage: 'mysql2',
};

const dataSource = new DataSource(DataSourceConfig);
export default dataSource;
