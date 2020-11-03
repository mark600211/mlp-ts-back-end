import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { EntitiesModule } from './entities/entities.module';

@Module({
  providers: [CommandsService],
  imports: [EntitiesModule],
  exports: [EntitiesModule],
})
export class CommandsModule {}
