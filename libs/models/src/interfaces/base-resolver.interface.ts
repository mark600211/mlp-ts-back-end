import { Type } from '@nestjs/common';

export abstract class BaseResolverHostInterface {
  abstract findAll: () => Promise<any>;
  //   findById: (id: string) => Promise<T>;
  //   create: <C extends Type<unknown>>(data: C) => Promise<T>;
  //   update: <U extends Type<unknown>>(data: U) => Promise<T>;
}
