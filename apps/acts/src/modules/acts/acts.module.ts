import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActsService } from './acts.service';
import { ActsController } from './acts.controller';
import { Act } from '@app/models';
import { ActResolver } from './act.resolver';
import { ConsumersModule } from '../consumers/consumers.module';
import { ConsumersService } from '../consumers/consumers.service';
import { BaseResolverModule } from '@app/resolvers';
import { EntitiesModule } from '@app/commands/entities/entities.module';
import { PathSercvice } from './path.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Act]),
    ConsumersModule,
    EntitiesModule.register(),
    BaseResolverModule.register([
      {
        classRef: Act,
        serviceDataRef: ActsService,
        injectServices: [ConsumersService],
      },
    ]),
  ],
  providers: [ActsService, PathSercvice, ActResolver],
  controllers: [ActsController],
})
export class ActsModule {}
