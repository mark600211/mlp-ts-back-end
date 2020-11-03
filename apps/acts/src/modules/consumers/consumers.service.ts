import { EntitiesService } from '@app/commands';
import {
  Application,
  ApplicationBase,
  NewActDto,
  TryCatchWrapper,
} from '@app/models';
import { Injectable, Logger } from '@nestjs/common';
import { TypeKey } from './enum/type-key';
import { SwitchTypes } from './switch-types';

@Injectable()
export class ConsumersService {
  logger = new Logger(this.constructor.name);

  constructor(private readonly entities: EntitiesService) {}

  @TryCatchWrapper()
  findAllConsumers<T>(data: NewActDto): T {
    this.logger.verbose('find-all-consumers');

    let allConsumers: T;

    const keys = Object.keys(data);

    keys.forEach(async key => {
      if (Object.values(TypeKey).includes(key as any)) {
        const switcher = new SwitchTypes(key as TypeKey);

        const entityType = switcher.entityType;

        if (data[key] && !Array.isArray(data[key])) {
          const consumer = await this.entities.findEntityByIdWithException(
            entityType,
            data[key],
          );

          allConsumers[key] = consumer;
        }

        if (Array.isArray(data[key]) && data[key].length >= 1) {
          const consumerFoundArr: any[] = [];

          const consumerArr: any[] = data[key];

          if (consumerArr[0] instanceof ApplicationBase) {
            consumerArr.forEach(async (app: ApplicationBase) => {
              const consumer = await this.entities.updateEntityById(
                Application,
                app,
                app.id,
              );

              consumerFoundArr.push(consumer);
            });
          } else {
            consumerArr.forEach(async id => {
              const consumer = await this.entities.findEntityByIdWithException(
                entityType,
                id,
              );

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
  }
}
