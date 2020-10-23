import { Module } from '@nestjs/common';
import * as path from 'path';
import { DatabaseModule } from './database/database.module';
import { ActsModule } from './modules/acts/acts.module';
import { CustomersModule } from './modules/customers/customers.module';
import { GeneralCustomersModule } from './modules/general-customers/general-customers.module';
import { LabsModule } from './modules/labs/labs.module';
import { TypeOfSampleModule } from './modules/type-of-sample/type-of-sample.module';
import { KafkaClientOptions } from './options/kafka.client.options';
import { ClientProxyFactory } from '@nestjs/microservices';
import { FilesModule } from './modules/files/files.module';
import { ConfigModule } from '@app/config';
import { ConsumersModule } from './modules/consumers/consumers.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    ConfigModule.register({ folder: path.resolve(__dirname, './config') }),
    DatabaseModule,
    ActsModule,
    CustomersModule,
    GeneralCustomersModule,
    LabsModule,
    TypeOfSampleModule,
    FilesModule,
    ConsumersModule,
  ],
  providers: [
    KafkaClientOptions,
    {
      provide: 'KAFKA_CLIENT',
      useFactory: async (kafkaClientOptions: KafkaClientOptions) => {
        const options = await kafkaClientOptions.getKafkaOptions();
        return ClientProxyFactory.create({ ...options });
      },
      inject: [KafkaClientOptions],
    },
  ],
})
export class AppModule {}
