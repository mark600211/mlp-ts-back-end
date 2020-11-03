import { Inject, Logger, Type } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TryCatchWrapperAsync } from '@app/models';
import { AbstractDataService } from './abstract-data.service';
import { dataServiceToken, entitiesToken } from './data-service.token';
import { ObjectType } from 'typeorm';
import { EntitiesService } from 'libs/commands/src';
import { DbService } from '@app/db';

export function BaseResolver<
  T extends ObjectType<T>,
  ND extends Type<unknown>,
  UD extends Type<unknown>,
  E extends ObjectType<E>
>(
  classRef: T,
  newDataDto: ND,
  updateDataDto: UD,
  eventCondition: boolean,
  eventClassRef?: E,
): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    logger = new Logger('TTTTTTTTT');

    protected entities: EntitiesService;

    constructor(
      @Inject(dataServiceToken) private readonly service: AbstractDataService,
      private readonly factory: EntitiesService,
      private readonly db: DbService,
    ) {
      this.entities = new EntitiesService(db);
    }

    @Query(type => [classRef], { name: `findAll${classRef.name}` })
    @TryCatchWrapperAsync()
    async findAll(): Promise<T[]> {
      this.logger.verbose(this.entities);
      this.logger.verbose(this.service);

      return await this.db.findEntitiess(classRef);
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
