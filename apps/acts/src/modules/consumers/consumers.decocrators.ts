import { CONSUMERS } from '@app/models/enum/consumers.enum';
import { Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

export function createConsumerEventPattern(
  consumerType: CONSUMERS,
  logger: Logger,
) {
  return function(
    target: any,
    propertyKye: string,
    descriptor: PropertyDescriptor,
  ) {
    EventPattern(`outbox.event.${consumerType}.CREATED`)(
      target,
      propertyKye,
      descriptor,
    );

    const origignalMethod = descriptor.value;

    descriptor.value = function(...args) {
      logger.verbose(`handle-new-${consumerType}`);
      const result = origignalMethod.apply(this, args);

      return result;
    };
  };
}

export function updateConsumerEventPattern(
  consumerType: CONSUMERS,
  logger: Logger,
) {
  return function(
    target: any,
    propertyKye: string,
    descriptor: PropertyDescriptor,
  ) {
    EventPattern(`outbox.event.${consumerType}.UPDATED`)(
      target,
      propertyKye,
      descriptor,
    );

    const origignalMethod = descriptor.value;

    descriptor.value = function(...args) {
      logger.verbose(`handle-update-${consumerType}`);
      const result = origignalMethod.apply(this, args);

      return result;
    };
  };
}
