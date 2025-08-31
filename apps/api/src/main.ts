import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { setupOpenApi } from '@fitness-app/utils';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  setupOpenApi(app, {
    title: 'Fitness App API',
    description: 'API for the Fitness App',
    version: '1.0.0',
    customSiteTitle: 'Fitness App API',
    path: globalPrefix,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
