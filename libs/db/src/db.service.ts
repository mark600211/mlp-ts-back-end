import { ConsumerNotFound, EntityNotFound } from '@app/models';
import { Injectable, Logger } from '@nestjs/common';
import { Repository, getRepository, EntityTarget } from 'typeorm';

@Injectable()
export class DbService {
  logger = new Logger(this.constructor.name);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getRepository<T>(entity: EntityTarget<T>): Repository<T> {
    try {
      const repository = getRepository<T>(entity);

      return repository;
    } catch (error) {
      this.logger.error(error);
    }
  }

  creatEntity<T extends U, U>(data: U, entity: EntityTarget<T>): Promise<T> {
    this.logger.verbose('create entity');

    try {
      const repository: Repository<T> = this.getRepository<T>(entity);

      const newConsumer = repository.save({ ...data });

      return newConsumer;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateEntity<T extends U, U extends { id: string }>(
    data: U,
    entity: EntityTarget<T>,
  ): Promise<T> {
    this.logger.verbose('update entity');

    try {
      const repository: Repository<T> = this.getRepository<T>(entity);

      const newEntity: T = await repository.findOne(data.id);

      if (!newEntity) throw new EntityNotFound<T>();

      return newEntity;
    } catch (error) {
      this.logger.error(error);
    }
  }

  findeEntityWithException<T>(): Promise<T> {}
}
