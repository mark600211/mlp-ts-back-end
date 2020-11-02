import { CONSUMERS } from '@app/models/enum/consumers.enum';
import { Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

export function createConsumerEventPattern(consumerType: CONSUMERS) {
  return function(
    target: any,
    propertyKye: string,
    descriptor: PropertyDescriptor,
  ) {
    const logger = new Logger(target.constructor.name);

    EventPattern(`outbox.event.${consumerType}.CREATED`)(
      target,
      propertyKye,
      descriptor,
    );

    const origignalMethod = descriptor.value;

    descriptor.value = function(...args) {
      logger.verbose(`handle-new-${consumerType}`);

      try {
        const result = origignalMethod.apply(this, args);

        return result;
      } catch (error) {
        const [, , next] = args;

        logger.error(error);

        next(error);
      }
    };
  };
}

export function updateConsumerEventPattern(consumerType: CONSUMERS) {
  return function(
    target: any,
    propertyKye: string,
    descriptor: PropertyDescriptor,
  ) {
    const logger = new Logger(target.constructor.name);

    EventPattern(`outbox.event.${consumerType}.UPDATED`)(
      target,
      propertyKye,
      descriptor,
    );

    const origignalMethod = descriptor.value;

    descriptor.value = function(...args) {
      logger.verbose(`handle-update-${consumerType}`);

      try {
        const result = origignalMethod.apply(this, args);

        return result;
      } catch (error) {
        const [, , next] = args;

        logger.error(error);

        next(error);
      }
    };
  };
}
