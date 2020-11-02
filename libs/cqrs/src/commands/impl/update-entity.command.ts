import { ObjectType } from 'typeorm';

export class UpdateEntityCommand<T extends U, U> {
  constructor(
    public readonly entity: ObjectType<T>,
    public readonly data: U,
    public id: string,
  ) {}
}
