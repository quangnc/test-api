import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiModule } from 'src/api.module';
import {
  IS_PRODUCTION,
  API_SERVER_PORT,
  API_SERVER_IP,
  API_ALLOW_ORIGINS,
} from 'src/configs';
import { BadRequestException, VersioningType } from '@nestjs/common';
import ValidationError from 'src/common/pipes/validation.error';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

export async function createApiServer() {
  const app = await NestFactory.create<NestExpressApplication>(ApiModule, {
    logger: IS_PRODUCTION ? ['log', 'error', 'warn', 'debug'] : undefined,
  });

  app.enableCors({
    allowedHeaders: 'Content-Type,Authorization',
    methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    origin: API_ALLOW_ORIGINS.split(',').map((o) => o.trim()),
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  // Required content type json on api request
  app.use((req, res, next) => {
    if (
      req.path.includes('api') &&
      req.headers['content-type'] === 'text/plain'
    ) {
      throw new BadRequestException(
        'Please using Content-Type: application/json',
      );
    }
    next();
  });

  app.useGlobalPipes(ValidationError);
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(API_SERVER_PORT, API_SERVER_IP);
  return app.getUrl();
}
