/* eslint-disable prefer-const */
import { DbService } from '@app/db';
import { Application, ApplicationBase, NewActDto } from '@app/models';
import { Injectable, Logger } from '@nestjs/common';
import { EntityTarget, ObjectType } from 'typeorm';
import { TypeKey } from './enum/type-key';
import { SwitchTypes } from './switch-types';

@Injectable()
export class ConsumersService {
  logger = new Logger(this.constructor.name);

  constructor(private readonly dbService: DbService) {}

  createConsumer<T extends U, U>(entity: ObjectType<T>, data: U): Promise<T> {
    this.logger.verbose('create-consumer');

    try {
      return this.dbService.creatEntity(data, entity);
    } catch (error) {
      this.logger.error(error);
    }
  }

  updateConsumer<T extends U, U>(
    entity: ObjectType<T>,
    data: U,
    id: string,
  ): Promise<T> {
    this.logger.verbose('update-consumer');

    try {
      return this.dbService.updateEntityById(entity, data, id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  findAllConsumers<T>(data: NewActDto): T {
    this.logger.verbose('find-all-consumers');

    try {
      let allConsumers: T;

      const keys = Object.keys(data);

      keys.forEach(async key => {
        if (Object.values(TypeKey).includes(key as any)) {
          const switcher = new SwitchTypes(key as TypeKey);

          const entityType = switcher.entityType;

          if (data[key] && !Array.isArray(data[key])) {
            const consumer = await this.dbService.findEntityByIdWithException(
              entityType,
              data[key],
            );

            allConsumers[key] = consumer;
          }

          if (Array.isArray(data[key]) && data[key].length >= 1) {
            let consumerFoundArr: any[] = [];

            const consumerArr: any[] = data[key];

            if (consumerArr[0] instanceof ApplicationBase) {
              consumerArr.forEach(async (app: ApplicationBase) => {
                const consumer = await this.dbService.updateEntityById(
                  Application,
                  app,
                  app.id,
                );

                consumerFoundArr.push(consumer);
              });
            } else {
              consumerArr.forEach(async id => {
                const consumer = await this.dbService.findEntityByIdWithException<
                  typeof entityType
                >(entityType, id);

                consumerFoundArr.push(consumer);
              });
            }

            allConsumers[key] = consumerFoundArr;
          }
        } else {
          return;
        }
      });

      return allConsumers;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
