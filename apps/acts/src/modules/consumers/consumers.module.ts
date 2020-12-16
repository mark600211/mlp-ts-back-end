import { Module } from '@nestjs/common';
import { ConsumersService } from './consumers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitiesModule } from '@app/commands/entities/entities.module';
import { ConsumersEntities } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([...ConsumersEntities]),
    EntitiesModule.register(),
  ],
  providers: [ConsumersService],
  //   controllers: [ConsumersController],
  exports: [ConsumersService],
})
export class ConsumersModule {}
