import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('ORIGIN'),
    methods: configService.get('ORIGIN_METHODS'),
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  await app.listen(configService.get('PORT'), async () => {
    console.log(`Server running on port ${await app.getUrl()}`);
  });
}
bootstrap();
