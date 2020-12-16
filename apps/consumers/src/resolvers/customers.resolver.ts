import { CreateConsumerDto, Customer, PatchConsumerDto } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Customer)
export class CustomersResolver extends BaseResolver(
  Customer,
  CreateConsumerDto,
  PatchConsumerDto,
) {
  constructor() {
    super();
  }
}
