import { HttpException, HttpStatus, Type } from '@nestjs/common';

export class EntityNotFound<T> extends HttpException {
  constructor(entity: Type<T>) {
    super(
      { status: HttpStatus.NOT_FOUND, error: `${entity.name} wasn't found` },
      HttpStatus.NOT_FOUND,
    );
  }
}
