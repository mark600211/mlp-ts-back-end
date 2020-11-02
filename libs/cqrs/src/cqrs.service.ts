import { DbService } from '@app/db';
import { TryCatchWrapper } from '@app/models';
import { Injectable } from '@nestjs/common';
import { ObjectType } from 'typeorm';

@Injectable()
export class CqrsService {
  constructor(private readonly dbService: DbService) {}

  @TryCatchWrapper()
  findEntities<T>(entity: ObjectType<T>): Promise<T[]> {
    return this.dbService.findEntities(entity);
  }

  @TryCatchWrapper()
  findEntityByIdWithException<T>(
    entity: ObjectType<T>,
    id: string,
  ): Promise<T> {
    return this.dbService.findEntityByIdWithException(entity, id);
  }

  @TryCatchWrapper()
  createEntity<T extends U, U>(entity: ObjectType<T>, data: U): Promise<T> {
    return this.dbService.creatEntity(entity, data);
  }

  @TryCatchWrapper()
  updateEntity<T extends U, U>(
    entity: ObjectType<T>,
    data: U,
    id: string,
  ): Promise<T> {
    return this.dbService.updateEntityById(entity, data, id);
  }

  @TryCatchWrapper()
  deleteEntityById<T>(entity: ObjectType<T>, id: string): void {
    this.dbService.deleteEntityById(entity, id);
  }
}
