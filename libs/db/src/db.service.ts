import { EntityNotFound } from '@app/models';
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

      const newEntity = repository.save({ ...data });

      return newEntity;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateEntityById<T extends U, U>(
    entity: EntityTarget<T>,
    data: U,
    id: string,
  ): Promise<T> {
    this.logger.verbose('update entity');

    try {
      const repository: Repository<T> = this.getRepository<T>(entity);

      const newEntity = await this.findEntityByIdWithException(entity, id);

      await repository.save(newEntity, data);

      return newEntity;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findEntityByIdWithException<T>(
    entity: EntityTarget<T>,
    id: string,
  ): Promise<T> {
    this.logger.verbose('find entity');

    try {
      const repository = this.getRepository<T>(entity);

      const newEntity = repository.findOne(id);

      if (!newEntity) throw new EntityNotFound<T>();

      return newEntity;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
