import { Module } from '@nestjs/common';
import * as path from 'path';
import { ActsModule } from './modules/acts/acts.module';
import { KafkaClientOptions } from './options/kafka.client.options';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigModule } from '@app/config';
import { ConsumersModule } from './modules/consumers/consumers.module';
import { ApplicationModule } from './modules/application/application.module';
import { DbModule } from '@app/db';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    DbModule.forRoot(),
    ConfigModule.register({ folder: path.resolve(__dirname, './config') }),
    ActsModule,
    ConsumersModule,
    ApplicationModule,
  ],
  providers: [
    // KafkaClientOptions,
    // {
    //   provide: 'KAFKA_CLIENT',
    //   useFactory: async (kafkaClientOptions: KafkaClientOptions) => {
    //     const options = await kafkaClientOptions.getKafkaOptions();
    //     return ClientProxyFactory.create({ ...options });
    //   },
    //   inject: [KafkaClientOptions],
    // },
  ],
})
export class AppModule {}
