import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export const setupOpenApi = (
  app: INestApplication<unknown>,
  options: {
    title: string;
    path: string;
    description: string;
    version: string;
    customSiteTitle: string;
    swaggerOptions?: SwaggerCustomOptions;
  }
) => {
  app.setGlobalPrefix(options.path);
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle(options.title)
      .setDescription(options.description)
      .setVersion(options.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(options.path, app, document, {
      swaggerOptions: options.swaggerOptions,
      customSiteTitle: options.customSiteTitle,
    });
  }
};
