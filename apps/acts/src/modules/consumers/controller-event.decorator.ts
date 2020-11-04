/* eslint-disable prefer-const */
import { Logger, Type } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { EventPattern, Payload } from '@nestjs/microservices';

export function newMethodWrapper() {
  return function(
    target: any,
    propertyKye: string,
    descriptor: PropertyDescriptor,
  ) {
    const ori = descriptor.value;

    const logger = new Logger(target.constructor.name);

    logger.verbose('test');

    logger.verbose(target.constructor.prototype['handleTest']);
    descriptor.value = function(...args: any[]) {
      const method = `handle${typeof args[0]}`;

      logger.verbose('ddddd');

      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        target.prototype[method],
        method,
      );

      Query(returns => [typeof args[0]], {
        name: 'tese',
        nullable: true,
      })(target.prototype[method], method, descriptor);
      //   //   EventPattern(`outbox.event.${typeof args[0]}.CREATED`)(
      //   //     target.prototype[method],
      //   //     method,
      //   //     descriptor,
      //   //   );

      const res = ori.apply(this, args);
      return res;
    };
  };
}

export function controllerEvent(
  options: {
    consumerClassRef: Type<unknown>;
    payloadClassRef: Type<unknown>;
  }[],
) {
  return function<T extends { new (...constructorArgs: any[]) }>(
    constructorFunction: T,
  ) {
    const logger = new Logger(constructorFunction.name);
    options.forEach(data => {
      const method = `handleNew${data.consumerClassRef.name}`;
      Reflect.defineProperty(constructorFunction.prototype, method, {
        writable: true,
      });
      logger.error(constructorFunction.prototype[method]);

      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructorFunction.prototype,
        method,
      );
      //   Payload()(constructorFunction.prototype[method], method, 0);
    });
    // options.forEach(data => {
    //   const method = `handleNew${data.consumerClassRef.name}`;
    //   const descriptor: any = Reflect.getOwnPropertyDescriptor(
    //     constructorFunction.prototype,
    //     method,
    //   );
    //   logger.verbose(descriptor);
    //   EventPattern(`outbox.event.${data.consumerClassRef.name}.CREATED`)(
    //     constructorFunction.prototype[method],
    //     method,
    //     descriptor,
    //   );
    // });
  };
}

export function resolverEvent(consumerClassRef: Type<unknown>[]) {
  return function<T extends { new (...constructorArgs: any[]) }>(
    constructorFunction: T,
  ) {
    const logger = new Logger(constructorFunction.name);
    consumerClassRef.forEach(data => {
      const method = `handle${data.name}`;
      Reflect.defineProperty(constructorFunction.prototype, method, {
        value: () => {
          return {} as Promise<typeof consumerClassRef>;
        },
        writable: true,
      });
      logger.error(constructorFunction.prototype[method]);

      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructorFunction.prototype,
        method,
      );
      //   Query(returns => [typeof consumerClassRef], {
      //     name: 'tese',
      //     nullable: true,
      //   })(constructorFunction.prototype[method], method, descriptor);
      //   Args('id')(constructorFunction.prototype[method], method, 0);
    });
    // options.forEach(data => {
    //   const method = `handleNew${data.consumerClassRef.name}`;
    //   const descriptor: any = Reflect.getOwnPropertyDescriptor(
    //     constructorFunction.prototype,
    //     method,
    //   );
    //   logger.verbose(descriptor);
    //   EventPattern(`outbox.event.${data.consumerClassRef.name}.CREATED`)(
    //     constructorFunction.prototype[method],
    //     method,
    //     descriptor,
    //   );
    // });
  };
}
