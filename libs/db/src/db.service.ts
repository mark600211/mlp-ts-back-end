import { EntityNotFound } from '@app/models';
import { Injectable, Logger, Type } from '@nestjs/common';
import { Repository, getRepository, ObjectType } from 'typeorm';

@Injectable()
export class DbService {
  logger = new Logger(this.constructor.name);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getRepository<T>(entity: ObjectType<T>): Repository<T> {
    try {
      const repository = getRepository<T>(entity);

      return repository;
    } catch (error) {
      this.logger.error(error);
    }
  }

  findEntities<T>(entity: ObjectType<T>): Promise<T[]> {
    this.logger.verbose('find-entities');

    try {
      const repository: Repository<T> = this.getRepository<T>(entity);

      const entities = repository.find();

      return entities;
    } catch (error) {
      this.logger.error(error);
    }
  }

  creatEntity<T extends U, U>(entity: ObjectType<T>, data: U): Promise<T> {
    this.logger.verbose('create entity');

    try {
      const repository: Repository<T> = this.getRepository<T>(entity);

      const newEntity = repository.save({ ...data });

      return newEntity;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateEntityById<T, U>(
    entity: ObjectType<T>,
    data: U,
    id: string,
  ): Promise<T> {
    this.logger.verbose('update entity');

    try {
      const repository: Repository<T> = this.getRepository<T>(entity);

      let newEntity = await this.findEntityByIdWithException(entity, id);

      newEntity = { ...data };

      await repository.save(newEntity, data);

      return newEntity;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findEntityByIdWithException<T>(
    entity: ObjectType<T>,
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

  async deleteEntityById<T>(entity: ObjectType<T>, id: string): Promise<void> {
    this.logger.verbose('delete entity');

    try {
      const repository = this.getRepository(entity);

      const newEntity = await this.findEntityByIdWithException(entity, id);

      await repository.delete(newEntity);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
