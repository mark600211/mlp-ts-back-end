import { Injectable, Logger } from '@nestjs/common';
import { Entity, Repository, getRepository } from 'typeorm';

@Injectable()
export class DbService {
  logger = new Logger(this.constructor.name);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getRepository<T extends typeof Entity>(entity: T): Repository<T> {
    try {
      const repository = getRepository<T>(entity);

      return repository;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
