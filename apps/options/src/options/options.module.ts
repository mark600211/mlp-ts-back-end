import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands/handlers';
import { Entities } from './entities';
import { OptionsService } from './options.service';
import { QueryHandlers } from './queries/handlers';
import { Resolvers } from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([...Entities])],
  providers: [
    OptionsService,
    ...Resolvers,
    ...QueryHandlers,
    ...CommandHandlers,
  ],
})
export class OptionsModule {}
