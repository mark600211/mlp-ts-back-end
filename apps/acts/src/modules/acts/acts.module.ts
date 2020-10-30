import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActsService } from './acts.service';
import { CommandHadlers } from './commands/handlers';
import { EventsHandlers } from './events/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { ActsController } from './acts.controller';
import { QueryHandlers } from './queries/handlers';
import { Act, ActEvent } from '@app/models';
import { ActResolver } from './act.resolver';
import { ConsumersModule } from '../consumers/consumers.module';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Act, ActEvent]),
    ConsumersModule,
  ],
  providers: [
    ActsService,
    ActResolver,
    ...CommandHadlers,
    ...EventsHandlers,
    ...QueryHandlers,
  ],
  controllers: [ActsController],
})
export class ActsModule {}
