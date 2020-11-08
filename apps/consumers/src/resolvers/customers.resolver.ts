import {
  CreateConsumerDto,
  Customer,
  CustomerEvent,
  PatchConsumerDto,
} from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Customer)
export class CustomersResolver extends BaseResolver(
  Customer,
  CreateConsumerDto,
  PatchConsumerDto,
  true,
  CustomerEvent,
) {
  constructor() {
    super();
  }
}
