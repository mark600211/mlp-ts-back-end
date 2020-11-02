import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  GetEntityQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  CreateConsumerDto,
  Customer,
  CustomerEvent,
  PatchConsumerDto,
  TryCatchWrapperAsync,
} from '@app/models';
import { BaseResolver } from '@app/models/resolvers/base.resolver';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => Customer)
export class CustomersResolver extends BaseResolver<typeof Customer, CreateConsumerDto>(Customer) {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) { super() }

  @TryCatchWrapperAsync()
  @Query()
  async customers(): Promise<Customer[]> {
    return this.queryBus.execute(new GetEntitiesQuery(Customer));
  }

  @TryCatchWrapperAsync()
  @Query()
  async customer(@Args('id') id: string): Promise<Customer> {
      super
    return this.queryBus.execute(new GetEntityQuery(Customer, id));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async createCustomer(
    @Args('createCustomerData') createCustomerData: CreateConsumerDto,
  ): Promise<Customer> {
    return this.commandBus.execute(
      new CreateEntityWithEventCommand(
        Customer,
        createCustomerData,
        CustomerEvent,
      ),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateCustomer(
    @Args('updateCustomerData') updateCustomerData: PatchConsumerDto,
  ): Promise<Customer> {
    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        Customer,
        updateCustomerData,
        updateCustomerData.id,
        CustomerEvent,
      ),
    );
  }
}
