import { Type } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TryCatchWrapperAsync } from '../decorators';

export function BaseResolver<T extends Type<unknown>, D>(classRef: T): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    @TryCatchWrapperAsync()
    @Query(type => [classRef], { name: `findAll${classRef.name}` })
    async findAll(): Promise<T[]> {
      return [classRef];
    }

    @TryCatchWrapperAsync()
    @Query(type => classRef, { name: `findById${classRef.name}` })
    async findById(@Args('id') id: string): Promise<T> {
      return classRef;
    }

    @TryCatchWrapperAsync()
    @Mutation(type => classRef, { name: `create${classRef.name}` })
    async create<C extends Type<unknown>>(@Args('data') data: D): Promise<T> {
      return classRef;
    }

    @TryCatchWrapperAsync()
    @Mutation(type => classRef, { name: `update${classRef.name}` })
    async update<U extends Type<unknown>>(@Args('data') data: U): Promise<T> {
      return classRef;
    }
  }

  return BaseResolverHost;
}
