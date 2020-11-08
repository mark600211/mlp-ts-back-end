import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';
import { Test } from './test.model';

@Resolver(of => Test)
export class TestResolver extends BaseResolver(Test, String, String, false) {
  constructor() {
    super();
  }
}
