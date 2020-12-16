/* eslint-disable @typescript-eslint/camelcase */
import { DbService } from '@app/db';
import { EventDto, TryCatchWrapper, TryCatchWrapperAsync } from '@app/models';
import { Inject, Injectable, Type } from '@nestjs/common';
import { FindConditions, ObjectType, Repository } from 'typeorm';

@Injectable()
export class EntitiesService {
  constructor(@Inject(DbService) private readonly service: DbService) {}

  @TryCatchWrapper()
  getRepository<T>(classRef: Type<T>): Repository<T> {
    return this.service.getRepository(classRef);
  }

  @TryCatchWrapper()
  findEntities<T>(
    entity: Type<T>,
    relations?: Array<keyof T & string>,
  ): Promise<T[]> {
    return this.service.findEntitiess(entity, relations);
  }

  @TryCatchWrapper()
  findEntityByIdWithException<T>(
    entity: Type<T>,
    id: string,
    relations?: Array<keyof T & string>,
  ): Promise<T> {
    return this.service.findEntityByIdWithException(entity, id, relations);
  }

  @TryCatchWrapper()
  findOneWhere<T, F>(entity: ObjectType<T>, where: F): Promise<T> {
    return this.service.findOneWhere(entity, where);
  }

  @TryCatchWrapper()
  findManyWhere<T, F>(entity: ObjectType<T>, where: F): Promise<T[]> {
    return this.service.findManyWhere(entity, where);
  }

  @TryCatchWrapper()
  findWhereOrederedTaken<T>(
    entity: ObjectType<T>,
    where: FindConditions<T>,
    order: { [P in keyof T]?: 'ASC' | 'DESC' },
    take: number,
  ): Promise<T[]> {
    return this.service.findWhereOrederedTaken(entity, where, order, take);
  }

  @TryCatchWrapper()
  createEntity<T extends U, U>(entity: ObjectType<T>, data: U): Promise<T> {
    return this.service.creatEntity(entity, data);
  }

  @TryCatchWrapper()
  updateEntityById<T extends U, U>(
    entity: Type<T>,
    data: U,
    id: string,
  ): Promise<T> {
    return this.service.updateEntityById(entity, data, id);
  }

  @TryCatchWrapper()
  updateWere<T extends D, W, D>(
    entity: Type<T>,
    where: W,
    data: D,
  ): Promise<T> {
    return this.service.updateWhere(entity, where, data);
  }

  @TryCatchWrapperAsync()
  async createEntityWithEvent<T extends U, U, E>(
    entity: ObjectType<T>,
    data: U,
    eventEntity: ObjectType<E>,
  ): Promise<T> {
    const payload = (await this.createEntity(entity, data)) as any;

    this.entityCreated(
      eventEntity,
      payload,
      payload.id,
      payload.id,
      typeof entity,
    );

    return payload;
  }

  @TryCatchWrapper()
  entityCreated<E extends EventDto, P>(
    evetntEntity: ObjectType<E>,
    payload: P,
    eventKey: string,
    aggregateId: string,
    aggregateType: string,
  ): void {
    const data: EventDto = {
      payload,
      event_type: 'CREATED',
      event_key: eventKey,
      aggregateType: `${aggregateType}.CREATED`,
      aggregateid: aggregateId,
    };

    this.createEntity(evetntEntity, data);
  }

  @TryCatchWrapperAsync()
  async updateEntityByIdWithEvent<T extends U, U, E>(
    entity: Type<T>,
    data: U,
    id: string,
    eventEntity: ObjectType<E>,
  ): Promise<T> {
    const payload = (await this.updateEntityById(entity, data, id)) as any;

    this.entityUpdated(
      eventEntity,
      payload,
      payload.id,
      payload.id,
      typeof entity,
    );

    return payload;
  }

  @TryCatchWrapper()
  entityUpdated<E extends EventDto, P>(
    evetntEntity: ObjectType<E>,
    payload: P,
    eventKey: string,
    aggregateId: string,
    aggregateType: string,
  ): void {
    const data: EventDto = {
      payload,
      event_type: 'UPDATED',
      event_key: eventKey,
      aggregateType: `${aggregateType}.UPDATED`,
      aggregateid: aggregateId,
    };

    this.createEntity(evetntEntity, data);
  }

  @TryCatchWrapper()
  deleteEntityById<T>(entity: Type<T>, id: string): void {
    this.service.deleteEntityById(entity, id);
  }
}
