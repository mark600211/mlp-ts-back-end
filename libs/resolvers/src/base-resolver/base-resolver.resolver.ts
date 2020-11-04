import { Controller, Type } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TryCatchWrapperAsync } from '@app/models';
import { AbstractDataService } from './abstract-data.service';
import { ObjectType } from 'typeorm';
import { EntitiesService } from 'libs/commands/src';
import { dataService } from './data-service.decorator';

export function BaseResolver<
  T extends ObjectType<T>,
  ND extends Type<unknown>,
  UD extends Type<unknown>,
  E extends ObjectType<E>
>(
  classRef: T,
  newDataDto?: ND,
  updateDataDto?: UD,
  eventCondition = false,
  eventClassRef?: E,
): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    constructor(
      @dataService(classRef.name) private readonly service: AbstractDataService,
      private readonly entities: EntitiesService,
    ) {}

    @Query(type => [classRef], { name: `findAll${classRef.name}` })
    @TryCatchWrapperAsync()
    async findAll(): Promise<T[]> {
      return await this.entities.findEntities(classRef);
    }

    @Query(type => classRef, { name: `findById${classRef.name}` })
    @TryCatchWrapperAsync()
    async findById(@Args('id') id: string): Promise<T> {
      return this.entities.findEntityByIdWithException(classRef, id);
    }

    @Mutation(type => classRef, { name: `create${classRef.name}` })
    @TryCatchWrapperAsync()
    async create(
      @Args('data', { type: () => newDataDto }) data: ND,
    ): Promise<T> {
      const newData = await this.service.newData(data);

      if (eventCondition) {
        return this.entities.createEntityWithEvent(
          classRef,
          newData,
          eventClassRef,
        );
      } else {
        return this.entities.createEntity(classRef, newData);
      }
    }

    @Mutation(type => classRef, { name: `update${classRef.name}` })
    @TryCatchWrapperAsync()
    async update(
      @Args('data', { type: () => updateDataDto }) data: UD,
      @Args('id') id: string,
    ): Promise<T> {
      const updateData = await this.service.updateData(data);

      if (eventCondition) {
        return this.entities.updateEntityByIdWithEvent(
          classRef,
          updateData,
          id,
          eventClassRef,
        );
      } else {
        return this.entities.updateEntityById(classRef, updateData, id);
      }
    }
  }

  return BaseResolverHost;
}
