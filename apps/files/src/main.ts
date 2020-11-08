import { ConfigService } from '@app/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import { Logger } from '@nestjs/common';
import { ServiceModuleService } from '@app/proto';
import { MicroserviceOptions } from '@nestjs/microservices';

const configService = new ConfigService({
  folder: path.resolve(__dirname, './config'),
});

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const grpcService = app.get(ServiceModuleService);

  app.connectMicroservice<MicroserviceOptions>(grpcService.getServiceOptions());

  await app.startAllMicroservicesAsync();

  const port = configService.get<number>('PORT');

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
