import { EntitiesService } from '@app/commands';
import {
  ApplicationBase,
  NewActDto,
  PatchAppDto,
  Place,
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

              if (consumerArr[0].place) {
                consumerArr.forEach(async (app: PatchAppDto) => {
                  try {
                    if (app) {
                      const place = await this.entities.findEntityByIdWithException(
                        Place,
                        app.place,
                      );
                      const data = {
                        id: app.id,
                        datetime: app.datetime,
                        place,
                      } as ApplicationBase;

                      console.log('application');

                      console.log(data);

                      const consumer = await this.entities.updateEntityById(
                        ApplicationBase,
                        data,
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
