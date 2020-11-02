import { ObjectType } from 'typeorm';

export class GetEntityQuery<T> {
  constructor(public entity: ObjectType<T>, public id: string) {}
}
