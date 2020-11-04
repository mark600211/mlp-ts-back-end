/* eslint-disable prefer-const */
import { CustomerAct, CustomerBase } from '@app/models';
import { Controller, Logger } from '@nestjs/common';
import { controllerEvent } from '../consumers/controller-event.decorator';
import { MessageConsumerController } from '../consumers/interfaces/message.interface';
import { ActsService } from './acts.service';

export interface ChangeIdDto {
  newId: string;
  oldId: string;
}

function dec<T extends { new (...constructorArgs: any[]) }>(constructor: T) {
  let or = new constructor();
  or.prototype = constructor.prototype;
  const es = constructor.prototype['f'];
  Reflect.defineProperty(constructor.prototype, 'zzz', { value: 'zzz' });
}

const methods = [
  { consumerClassRef: CustomerAct, payloadClassRef: CustomerBase },
];

@controllerEvent(methods)
@Controller('acts')
export class ActsController {
  logger = new Logger(this.constructor.name);

  constructor() {
    Reflect.defineProperty(
      this.constructor.prototype,
      `handleNew${methods[0].consumerClassRef.name}`,
      {
        value: () => {
          return '2';
        },
        writable: true,
      },
    );
  }

  me() {
    this.logger.warn(
      this.constructor.prototype[
        `handleNew${methods[0].consumerClassRef.name}`
      ](),
    );
  }
}
