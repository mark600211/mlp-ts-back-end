import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import { ConfigService } from '@app/config';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
// import { grpcServiceOptions } from './options/grpc-service.options';
import { KafkaClientOptions } from './options/kafka.client.options';
import { ProtoService } from '@app/proto';
import { Modules } from '@app/models';

const configService = new ConfigService({
  folder: path.resolve(__dirname, './config'),
});

const protoService = new ProtoService({ module: Modules.ACTS, configService });

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const grpcServiceOptions = protoService.getServiceOptions();

  logger.verbose(grpcServiceOptions);

  app.connectMicroservice<MicroserviceOptions>(grpcServiceOptions);

  const kafkaService = app.get(KafkaClientOptions);

  app.connectMicroservice<MicroserviceOptions>(kafkaService.kafkaClientOptions);

  await app.startAllMicroservicesAsync();

  const port = configService.get<number>('PORT');

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
