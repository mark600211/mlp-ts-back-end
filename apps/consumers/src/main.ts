import { ConfigService } from '@app/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
  const configService = new ConfigService({
    folder: path.resolve(__dirname, './config'),
  });

  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = configService.get<number>('PORT');

  await app.listen(port);

  logger.log(`Application lictening on port ${port}`);
}
bootstrap();
