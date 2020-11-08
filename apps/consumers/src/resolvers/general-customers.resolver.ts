import {
  CreateConsumerDto,
  GeneralCustomer,
  GeneralCustomerEvent,
  PatchConsumerDto,
} from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => GeneralCustomer)
export class GeneralCustomerResolver extends BaseResolver(
  GeneralCustomer,
  CreateConsumerDto,
  PatchConsumerDto,
  true,
  GeneralCustomerEvent,
) {}
