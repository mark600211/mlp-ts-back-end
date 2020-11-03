import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActsService } from './acts.service';
import { ActsController } from './acts.controller';
import { Act, ActEvent } from '@app/models';
import { ActResolver } from './act.resolver';
import { ConsumersModule } from '../consumers/consumers.module';
import { BaseResolverModule } from '@app/resolvers';
import { ConsumersService } from '../consumers/consumers.service';
import { TestResolver } from './test.resolver';
import { Test } from './test.model';
import { CommandsModule } from '@app/commands';
import { DbService } from '@app/db';

@Module({
  imports: [
    CommandsModule,
    TypeOrmModule.forFeature([Act, ActEvent, Test]),
    ConsumersModule,
    BaseResolverModule.forRoot(ActsService, DbService, ConsumersService),
  ],
  providers: [ActsService, ActResolver, TestResolver],
  controllers: [ActsController],
})
export class ActsModule {}
