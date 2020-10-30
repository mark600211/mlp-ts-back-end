import { Module } from '@nestjs/common';
import { ConsumersService } from './consumers.service';
import { ConsumersController } from './consumers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumersEntities } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([...ConsumersEntities])],
  providers: [ConsumersService],
  controllers: [ConsumersController],
  exports: [ConsumersService],
})
export class ConsumersModule {}
