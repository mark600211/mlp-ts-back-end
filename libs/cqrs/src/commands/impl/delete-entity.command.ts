import { ObjectType } from 'typeorm';

export class DeleteEntityCommand<T> {
  constructor(public entity: ObjectType<T>, public id: string) {}
}
