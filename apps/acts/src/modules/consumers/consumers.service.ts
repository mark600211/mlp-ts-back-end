import { EntitiesService } from '@app/commands';
import {
  Act,
  Application,
  ApplicationBase,
  NewActDto,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { Injectable, Logger } from '@nestjs/common';
import { TypeKey } from './enum/type-key';
import { SwitchTypes } from './switch-types';

@Injectable()
export class ConsumersService {
  logger = new Logger(this.constructor.name);

  constructor(private readonly entities: EntitiesService) {}

  @TryCatchWrapperAsync()
  async findAllConsumers<T>(data: NewActDto): Promise<T> {
    let allConsumers: T = {} as T;

    const keys = Object.keys(data);

    await Promise.all(
      keys.map(async key => {
        try {
          if (Object.values(TypeKey).includes(key as any)) {
            const switcher = new SwitchTypes(key as TypeKey);

            const entityType = switcher.entityType as any;

            if (data[key] && !Array.isArray(data[key])) {
              this.logger.log(entityType);

              const consumer = await this.entities.findEntityByIdWithException(
                entityType,
                data[key],
              );

              allConsumers[key] = consumer;
            }

            if (
              Array.isArray(data[key]) &&
              data[key].length >= 1 &&
              data[key][0]
            ) {
              const consumerFoundArr: any[] = [];

              const consumerArr: any[] = data[key];

              if (consumerArr[0] instanceof ApplicationBase) {
                consumerArr.forEach(async (app: ApplicationBase) => {
                  try {
                    if (app) {
                      const consumer = await this.entities.updateEntityById(
                        Application,
                        app,
                        app.id,
                      );
                      consumerFoundArr.push(consumer);
                    }
                  } catch (error) {
                    this.logger.error(error.message);
                  }
                });
              } else {
                consumerArr.forEach(async id => {
                  try {
                    if (id) {
                      const consumer = await this.entities.findEntityByIdWithException(
                        entityType,
                        id,
                      );

                      consumerFoundArr.push(consumer);
                    }
                  } catch (error) {
                    this.logger.error(error.message);
                  }
                });
              }

              allConsumers[key] = consumerFoundArr;
            }
          }
        } catch (error) {
          this.logger.error(error.message);
        }
      }),
    );
    return allConsumers;
  }
}
