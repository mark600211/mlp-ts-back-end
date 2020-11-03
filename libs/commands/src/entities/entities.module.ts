import { DynamicModule, Module, Type } from '@nestjs/common';
import { EntitiesService } from './entities.service';

@Module({})
export class EntitiesModule {
  static register(): DynamicModule {
    return {
      module: EntitiesModule,
      providers: [EntitiesService],
      exports: [EntitiesService],
    };
  }
}
