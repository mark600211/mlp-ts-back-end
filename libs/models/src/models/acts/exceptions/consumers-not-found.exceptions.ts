import { HttpException, HttpStatus } from '@nestjs/common';

export class ConsumerNotFound extends HttpException {
  constructor(consumer: string) {
    super(
      { status: HttpStatus.NOT_FOUND, error: `${consumer} wasn't found` },
      HttpStatus.NOT_FOUND,
    );
  }
}
