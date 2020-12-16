import { Provider, Type } from '@nestjs/common';
import { ObjectType } from 'typeorm';
import { AbstractDataService } from './abstract-data.service';
import { BaseResolver } from './base-resolver.resolver';
import { getDataServiceToken, getResolverToken } from './token.service';

function createResolverProvider(classRef: Type<any>): Provider {
  return {
    provide: getResolverToken(classRef.name),
    useClass: BaseResolver(classRef),
  };
}

function createDataProvider(option: {
  classRef: ObjectType<unknown>;
  serviceDataRef: Type<AbstractDataService>;
}): Provider {
  return {
    provide: getDataServiceToken(option.classRef.name),
    useClass: option.serviceDataRef,
  };
}

export function createResolverProviders(
  classRefs: Type<unknown>[],
): Array<Provider> {
  return classRefs.map(option => createResolverProvider(option));
}

export function createDataProviders(
  options: {
    classRef: ObjectType<unknown>;
    serviceDataRef: Type<AbstractDataService>;
  }[],
): Provider[] {
  return options.map(option => createDataProvider(option));
}

export function createInjectServices(
  injectServicesArr: Type<unknown>[][],
): Type<unknown>[] {
  return injectServicesArr.reduce((accumulator, currentValue) => {
    return (accumulator = [...accumulator, ...currentValue]);
  });
}
