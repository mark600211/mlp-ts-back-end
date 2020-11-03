import { EntitiesService } from '@app/commands';
import { EntitiesModule } from '@app/commands/entities/entities.module';
import { DbModule, DbService } from '@app/db';
import { DynamicModule, Module, Type } from '@nestjs/common';
import { AbstractDataService } from './abstract-data.service';
import { dataServiceToken, entitiesToken } from './data-service.token';

@Module({})
export class BaseResolverModule {
  static forRoot(
    classDataRef: Type<AbstractDataService>,
    ...additionServices: Type<unknown>[]
  ): DynamicModule {
    return {
      module: BaseResolverModule,
      imports: [EntitiesModule.register(), DbModule.forRoot()],
      providers: [
        DbService,
        {
          provide: dataServiceToken,
          useClass: classDataRef,
        },
        EntitiesService,
        ...additionServices,
      ],
      exports: [dataServiceToken, entitiesToken],
    };
  }
}
