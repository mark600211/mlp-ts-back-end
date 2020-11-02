import { ObjectType } from 'typeorm';

export class GetEntitiesQuery<T> {
  constructor(public readonly entity: ObjectType<T>) {}
}
