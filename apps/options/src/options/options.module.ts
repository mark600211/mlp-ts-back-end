import { EntitiesModule } from '@app/commands/entities/entities.module';
import { BaseResolverModule } from '@app/resolvers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from './entities';
import { OptionsService } from './options.service';
import { ResolverUtils } from './resolver.utils';
import { Resolvers } from './resolvers';

@Module({
  imports: [
    TypeOrmModule.forFeature([...Entities]),
    BaseResolverModule.register([...ResolverUtils]),
    EntitiesModule.register(),
  ],
  providers: [OptionsService, ...Resolvers],
})
export class OptionsModule {}
