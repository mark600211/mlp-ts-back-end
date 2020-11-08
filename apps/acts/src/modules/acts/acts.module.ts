import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActsService } from './acts.service';
import { ActsController } from './acts.controller';
import { Act, ActEvent } from '@app/models';
import { ActResolver } from './act.resolver';
import { ConsumersModule } from '../consumers/consumers.module';
import { ConsumersService } from '../consumers/consumers.service';
import { TestResolver } from './test.resolver';
import { Test } from './test.model';
import { BaseResolverModule } from '@app/resolvers';
import { TestService } from './test.service';
import { EntitiesModule } from '@app/commands/entities/entities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Act, ActEvent, Test]),
    ConsumersModule,
    EntitiesModule.register(),
    BaseResolverModule.register([
      {
        classRef: Act,
        serviceDataRef: ActsService,
        injectServices: [ConsumersService],
      },
      {
        classRef: Test,
        serviceDataRef: TestService,
      },
    ]),
  ],
  providers: [ActsService, ActResolver, TestResolver],
  controllers: [ActsController],
})
export class ActsModule {}
