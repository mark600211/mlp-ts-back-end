import { Logger } from '@nestjs/common';

export function TryCatchWrapper<T>() {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const logger = new Logger(target.constructor.name);

    const originalMethod = descriptor.value;

    descriptor.value = function(...args) {
      logger.verbose(propertyKey);

      try {
        return originalMethod.apply(this, args);
      } catch (error) {
        logger.error(error.message);

        return error;
      }
    };
  };
}

export function TryCatchWrapperAsync() {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const logger = new Logger(target.constructor.name);

    const originalMethod = descriptor.value;

    descriptor.value = async function(...args) {
      logger.verbose(propertyKey);

      try {
        return originalMethod.apply(this, args);
      } catch (error) {
        logger.error(error.message);

        return error;
      }
    };
  };
}
