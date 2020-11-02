import { ObjectType } from 'typeorm';

export class CreateEntityCommand<T extends U, U> {
  constructor(public readonly entity: ObjectType<T>, public readonly data: U) {}
}
