import { EventDto } from '@app/models';
import { ObjectType } from 'typeorm';

export class UpdateEntityWithEventCommand<T extends U, U, F extends EventDto> {
  constructor(
    public readonly entity: ObjectType<T>,
    public data: U,
    public id: string,
    public eventEntity: ObjectType<F>,
  ) {}
}
