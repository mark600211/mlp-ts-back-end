import { ConfigService } from '@app/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import path from 'path';
import { AppModule } from './app.module';

const configService = new ConfigService({
  folder: path.resolve(__dirname, './config'),
});

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = configService.get<number>('PORT');

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();