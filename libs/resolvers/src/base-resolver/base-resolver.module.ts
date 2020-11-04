import { EntitiesService } from '@app/commands';
import { DynamicModule, Module, Type } from '@nestjs/common';
import { ObjectType } from 'typeorm';
import { AbstractDataService } from './abstract-data.service';
import { BaseResolver } from './base-resolver.resolver';
import {
  createDataProviders,
  createInjectServices,
  createResolverProviders,
} from './providers.service';
import { getDataServiceTokens, getResolverTokens } from './token.service';

@Module({})
export class BaseResolverModule {
  static register(
    options: {
      classRef: ObjectType<unknown>;
      serviceDataRef: Type<AbstractDataService>;
      injectServices?: Type<unknown>[];
    }[],
  ): DynamicModule {
    const prefixedResolverProviders = createResolverProviders(
      options.map(data => data.classRef),
    );

    const prefixedDataProviders = createDataProviders(
      options.map(data => {
        return { classRef: data.classRef, serviceDataRef: data.serviceDataRef };
      }),
    );

    const prefixedInjectServices = createInjectServices(
      options.map(data => (data.injectServices ? data.injectServices : [])),
    );

    const prefixedDataServiceTokens = getDataServiceTokens(
      options.map(data => data.classRef.name),
    );

    const prefixedResolverTokens = getResolverTokens(
      options.map(data => data.classRef.name),
    );

    return {
      module: BaseResolverModule,
      providers: [
        EntitiesService,
        ...prefixedResolverProviders,
        ...prefixedDataProviders,
        ...prefixedInjectServices,
      ],
      exports: [EntitiesService, ...prefixedDataServiceTokens],
    };
  }
}
