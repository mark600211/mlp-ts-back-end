/* eslint-disable @typescript-eslint/camelcase */
import { DbService } from '@app/db';
import { EventDto, TryCatchWrapper, TryCatchWrapperAsync } from '@app/models';
import { Inject, Injectable } from '@nestjs/common';
import { ObjectType } from 'typeorm';

@Injectable()
export class EntitiesService {
  constructor(@Inject(DbService) private readonly service: DbService) {}

  @TryCatchWrapper()
  findEntities<T>(entity: ObjectType<T>): Promise<T[]> {
    return this.service.findEntitiess(entity);
  }

  @TryCatchWrapper()
  findEntityByIdWithException<T>(
    entity: ObjectType<T>,
    id: string,
  ): Promise<T> {
    return this.service.findEntityByIdWithException(entity, id);
  }

  @TryCatchWrapper()
  createEntity<T extends U, U>(entity: ObjectType<T>, data: U): Promise<T> {
    return this.service.creatEntity(entity, data);
  }

  @TryCatchWrapper()
  updateEntityById<T extends U, U>(
    entity: ObjectType<T>,
    data: U,
    id: string,
  ): Promise<T> {
    return this.service.updateEntityById(entity, data, id);
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
    entity: ObjectType<T>,
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
  deleteEntityById<T>(entity: ObjectType<T>, id: string): void {
    this.service.deleteEntityById(entity, id);
  }
}
