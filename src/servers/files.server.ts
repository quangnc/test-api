import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IS_PRODUCTION, FILES_SERVER_IP, FILES_SERVER_PORT } from 'src/configs';
import { FilesModule } from '../files.module';
import { join } from 'path';

export async function createFilesServer() {
  const app = await NestFactory.create<NestExpressApplication>(FilesModule, {
    logger: IS_PRODUCTION ? ['log', 'error', 'warn', 'debug'] : undefined,
  });
  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
    prefix: '/uploads',
  });

  await app.listen(FILES_SERVER_PORT, FILES_SERVER_IP);
  return app.getUrl();
}
