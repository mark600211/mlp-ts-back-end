import { ConfigModule } from '@app/config';
import { DbModule } from '@app/db';
import { Module } from '@nestjs/common';
import { Resolvers } from './resolvers';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from './entities';
import { BaseResolverModule } from '@app/resolvers';
import { Customer, GeneralCustomer, Lab } from '@app/models';
import { ConsumersService } from './consumers.service';

@Module({
  imports: [
    DbModule.forRoot(),
    ConfigModule.register({ folder: path.resolve(__dirname, './config') }),
    TypeOrmModule.forFeature([...Entities]),
    BaseResolverModule.register([
      {
        classRef: Customer,
        serviceDataRef: ConsumersService,
      },
      {
        classRef: GeneralCustomer,
        serviceDataRef: ConsumersService,
      },
      {
        classRef: Lab,
        serviceDataRef: ConsumersService,
      },
    ]),
  ],
  providers: [ConsumersService, ...Resolvers],
})
export class AppModule {}
