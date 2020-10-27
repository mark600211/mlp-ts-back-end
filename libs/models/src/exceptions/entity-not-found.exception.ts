import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFound<T> extends HttpException {
  constructor() {
    let t: T;
    const k = typeof t;
    super(
      { status: HttpStatus.NOT_FOUND, error: `${k} wasn't found` },
      HttpStatus.NOT_FOUND,
    );
  }
}
