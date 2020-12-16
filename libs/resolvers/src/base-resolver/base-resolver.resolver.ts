import { Type } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TryCatchWrapperAsync } from '@app/models';
import { AbstractDataService } from './abstract-data.service';
import { ObjectType } from 'typeorm';
import { EntitiesService } from 'libs/commands/src';
import { dataService } from './data-service.decorator';

export function BaseResolver<T extends UWD, ND, UD, FM, FO, UWW, UWD>(
  classRef: Type<T>,
  newDataDto?: ND,
  updateDataDto?: UD,
  findManyWhereDto?: FM,
  findOneWhereDto?: FO,
  updateWhereDto?: UWW,
  updateWhereDataDto?: UWD,
): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    constructor(
      @dataService(classRef.name) private readonly service: AbstractDataService,
      private readonly entities: EntitiesService,
    ) {}

    @Query(type => [classRef], { name: `findAll${classRef.name}` })
    @TryCatchWrapperAsync()
    async findAll(
      @Args('field', { nullable: true }) field: string,
      @Args('relations', { nullable: true, type: () => [String] })
      relations: string[],
    ): Promise<T[]> {
      if (field) {
        return this.service.createDistinctForOption(classRef, field);
      }

      const entities = await this.entities.findEntities(
        classRef,
        relations as Array<keyof T & string>,
      );

      return entities;
    }

    @Query(type => classRef, { name: `findById${classRef.name}` })
    @TryCatchWrapperAsync()
    async findById(@Args('id') id: string): Promise<T> {
      return await this.entities.findEntityByIdWithException(classRef, id);
    }

    @Query(type => [classRef], { name: `findManyWhere${classRef.name}` })
    @TryCatchWrapperAsync()
    async findManyWhere(
      @Args('where', {
        type: () => (findManyWhereDto ? findManyWhereDto : String),
      })
      where: FM,
    ): Promise<T[]> {
      const populateWhere = await this.service.populateWhere(where);

      return await this.entities.findManyWhere(classRef, populateWhere);
    }

    @Query(type => classRef, { name: `findOneWhere${classRef.name}` })
    @TryCatchWrapperAsync()
    async findOneWhere(
      @Args('where', {
        type: () => (findOneWhereDto ? findOneWhereDto : String),
      })
      where: FO,
    ): Promise<T> {
      return await this.entities.findOneWhere(classRef, where);
    }

    @Mutation(type => classRef, { name: `create${classRef.name}` })
    @TryCatchWrapperAsync()
    async create(
      @Args('data', { type: () => (newDataDto ? newDataDto : String) })
      data: ND,
    ): Promise<T> {
      const newData = await this.service.newData(data);

      return await this.entities.createEntity(classRef, newData);
    }

    @Mutation(type => classRef, { name: `update${classRef.name}` })
    @TryCatchWrapperAsync()
    async update(
      @Args('data', { type: () => (updateDataDto ? updateDataDto : String) })
      data: UD,
      @Args('id') id: string,
    ): Promise<T> {
      const updateData = await this.service.updateData(data);

      return await this.entities.updateEntityById(classRef, updateData, id);
    }

    @Mutation(type => classRef, { name: `updateWhere${classRef.name}` })
    @TryCatchWrapperAsync()
    async updateWhere(
      @Args('where', { type: () => (updateWhereDto ? updateWhereDto : String) })
      where: UWW,
      @Args('data', {
        type: () => (updateWhereDataDto ? updateWhereDataDto : String),
      })
      data: UWD,
    ) {
      return await this.entities.updateWere(classRef, where, data);
    }

    @Mutation(type => classRef, {
      name: `deleteById${classRef.name}`,
      nullable: true,
    })
    @TryCatchWrapperAsync()
    async deleteById(@Args('id') id: string): Promise<void> {
      this.entities.deleteEntityById(classRef, id);
    }
  }

  return BaseResolverHost;
}
