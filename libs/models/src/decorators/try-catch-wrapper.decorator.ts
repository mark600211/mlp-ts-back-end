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
        originalMethod.apply(this, args);
      } catch (error) {
        const [, , next] = args;

        logger.error(error);

        next(error);
      }
    };
  };
}

export function TryCatchWrapperAsync<T>() {
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
        await originalMethod.apply(this, args);
      } catch (error) {
        const [, , next] = args;

        logger.error(error);

        next(error);
      }
    };
  };
}
