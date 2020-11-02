import { EventDto } from '@app/models';
import { ObjectType } from 'typeorm';

export class EntityUpdatedEvent<T extends EventDto, F> {
  constructor(
    public readonly entity: ObjectType<T>,
    public readonly payload: F,
    public readonly eventKey: string,
    public readonly aggregateId: string,
  ) {}
}
