import {
  DefinedIndicator,
  EntityNotFound,
  TryCatchWrapperAsync,
} from '@app/models';
import { Injectable, Logger, Type } from '@nestjs/common';
import {
  Repository,
  getRepository,
  ObjectType,
  FindConditions,
  In,
} from 'typeorm';

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

  async findEntitiess<T>(
    entity: ObjectType<T>,
    relations?: Array<keyof T & string>,
  ): Promise<T[]> {
    this.logger.verbose('find-entities');

    try {
      const repository: Repository<T> = this.getRepository<T>(entity);

      let entities: T[];

      if (relations) {
        entities = await repository.find({
          relations,
        });
      } else {
        entities = await repository.find();
      }

      return entities;
    } catch (error) {
      this.logger.error(error);
    }
  }

  @TryCatchWrapperAsync()
  async findManyByIds<T>(
    entity: Type<T>,
    ids: string[],
    relations: Array<keyof T & string>,
  ): Promise<T[]> {
    const repository: Repository<T> = this.getRepository<T>(entity);

    let entities: Promise<T[]>;

    if (!relations) {
      entities = repository.find({ where: { id: In(ids) } });
    } else {
      entities = repository.find({ where: { id: In(ids) }, relations });
    }

    return entities;
  }

  async creatEntity<T, U>(entity: ObjectType<T>, data: U): Promise<T> {
    this.logger.verbose('create entity');

    try {
      const repository: Repository<T> = this.getRepository<T>(entity);

      const newEntity = repository.create(data);

      await repository.save(newEntity);

      return newEntity;
    } catch (error) {
      this.logger.error(error);
    }
  }

  @TryCatchWrapperAsync()
  async saveEntity<T, U>(entity: Type<T>, data: U): Promise<T> {
    const repository = this.getRepository(entity);

    return repository.save(data);
  }

  async updateEntityById<T extends U, U>(
    entity: Type<T>,
    data: U,
    id: string,
  ): Promise<T> {
    this.logger.verbose('update entity');

    try {
      const repository: Repository<T> = this.getRepository<T>(entity);

      const newEntity = await repository.save(data);

      if (!newEntity) throw new EntityNotFound<T>(entity);

      return newEntity;
    } catch (error) {
      this.logger.error(error);
    }
  }

  @TryCatchWrapperAsync()
  async updateWhere<T extends D, W, D>(
    entity: Type<T>,
    where: W,
    data: D,
  ): Promise<T> {
    const repository = this.getRepository(entity);

    const newEtity = await repository.save(data);

    if (!newEtity) throw new EntityNotFound<T>(entity);

    return newEtity;
  }

  async findEntityByIdWithException<T, R>(
    entity: Type<T>,
    id: string,
    relations?: Array<keyof T & string>,
  ): Promise<T> {
    this.logger.verbose('find entity');

    try {
      const repository = this.getRepository<T>(entity);

      let newEntity: T;

      if (relations) {
        newEntity = await repository.findOne(id, { relations });
      } else {
        newEntity = await repository.findOne(id);
      }

      if (!newEntity) throw new EntityNotFound<T>(entity);

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

  async deleteEntityById<T>(entity: Type<T>, id: string): Promise<void> {
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
