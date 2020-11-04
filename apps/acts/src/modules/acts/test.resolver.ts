import { EntitiesService } from '@app/commands';
import { BaseResolver } from '@app/resolvers';
import { Logger } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ObjectType } from 'typeorm';
import {
  newMethodWrapper,
  resolverEvent,
} from '../consumers/controller-event.decorator';
import { Test } from './test.model';

@resolverEvent([Test])
@Resolver(of => Test)
export class TestResolver extends BaseResolver(Test, String, String, false) {
  logger = new Logger(this.constructor.name);

  constructor(private readonly entities: EntitiesService) {
    super();
    Reflect.defineProperty(this.constructor.prototype, `HandleTest`, {
      value: () => this.me(Test),
      writable: true,
    });

    this.logger.verbose(this.constructor.prototype[`HandleTest`]);
  }

  @newMethodWrapper()
  async me(classRef: ObjectType<unknown>): Promise<any[]> {
    return await this.entities.findEntities(classRef);
  }
}
