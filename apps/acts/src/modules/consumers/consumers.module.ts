import { Module } from '@nestjs/common';
import { ConsumersService } from './consumers.service';
import { ConsumersController } from './consumers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumersEntities } from './entities';
import { EntitiesModule } from '@app/commands/entities/entities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([...ConsumersEntities]),
    EntitiesModule.register(),
  ],
  providers: [ConsumersService],
  controllers: [ConsumersController],
  exports: [ConsumersService],
})
export class ConsumersModule {}
