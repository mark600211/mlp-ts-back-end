import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActsService } from './acts.service';
import { ActsController } from './acts.controller';
import { Act, ActEvent } from '@app/models';
import { ActResolver } from './act.resolver';
import { ConsumersModule } from '../consumers/consumers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Act, ActEvent]), ConsumersModule],
  providers: [ActsService, ActResolver],
  controllers: [ActsController],
})
export class ActsModule {}
