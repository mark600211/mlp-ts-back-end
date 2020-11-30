import { EntityNotFound, TryCatchWrapperAsync } from '@app/models';
import { Injectable, Logger } from '@nestjs/common';
import { Repository, getRepository, ObjectType, FindConditions } from 'typeorm';

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

  async findEntitiess<T>(entity: ObjectType<T>): Promise<T[]> {
    this.logger.verbose('find-entities');

    try {
      const repository: Repository<T> = this.getRepository<T>(entity);

      const entities = await repository.find();

      return entities;
    } catch (error) {
      this.logger.error(error);
    }
  }

  creatEntity<T, U>(entity: ObjectType<T>, data: U): Promise<T> {
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
    entity: ObjectType<T>,
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

  @TryCatchWrapperAsync()
  async updateWhere<T extends D, W, D>(
    entity: ObjectType<T>,
    where: W,
    data: D,
  ): Promise<T> {
    const repository = this.getRepository(entity);

    const newEtity = await repository.findOne(where);

    if (!newEtity) throw new EntityNotFound<T>();

    await repository.save(newEtity, data);

    return newEtity;
  }

  async findEntityByIdWithException<T, R>(
    entity: ObjectType<T>,
    id: string,
    relations?: Array<keyof T & string>
  ): Promise<T> {
    this.logger.verbose('find entity');

    try {
      const repository = this.getRepository<T>(entity);

      const newEntity = repository.findOne(id, { relations });

      if (!newEntity) throw new EntityNotFound<T>();

      return newEntity;
    } catch (error) {
      this.logger.error(error);
    }
  }

  @TryCatchWrapperAsync()
  async findWhereOrederedTaken<T>(
    entity: ObjectType<T>,
    where: FindConditions<T>,
    order: { [P in keyof T]?: 'ASC' | 'DESC' },
    take: number,
  ): Promise<T[]> {
    const repository = this.getRepository(entity);

    const entities = await repository.find({ where, order, take });

    return entities;
  }

  @TryCatchWrapperAsync()
  async findManyWhere<T, F>(entity: ObjectType<T>, where: F): Promise<T[]> {
    const repository = this.getRepository(entity);

    const entities = await repository.find(where);

    return entities;
  }

  @TryCatchWrapperAsync()
  async findOneWhere<T, F>(entity: ObjectType<T>, where: F): Promise<T> {
    const repositry = this.getRepository(entity);

    const findedEntity = await repositry.findOne(where);

    return findedEntity;
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
