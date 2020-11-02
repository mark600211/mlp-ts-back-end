import { EventDto } from '@app/models';
import { ObjectType } from 'typeorm';

export class CreateEntityWithEventCommand<T extends U, U, F extends EventDto> {
  constructor(
    public readonly entity: ObjectType<T>,
    public data: U,
    public eventEntity: ObjectType<F>,
  ) {}
}
