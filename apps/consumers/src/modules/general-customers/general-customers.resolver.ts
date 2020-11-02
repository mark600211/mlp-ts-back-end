import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  GetEntityQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  CreateConsumerDto,
  GeneralCustomer,
  GeneralCustomerEvent,
  PatchConsumerDto,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => GeneralCustomer)
export class GeneralCustomerResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapperAsync()
  @Query()
  async generalCustomers(): Promise<GeneralCustomer[]> {
    return this.queryBus.execute(new GetEntitiesQuery(GeneralCustomer));
  }

  @TryCatchWrapperAsync()
  @Query()
  async generalCustoemr(@Args('id') id: string): Promise<GeneralCustomer> {
    return this.queryBus.execute(new GetEntityQuery(GeneralCustomer, id));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async createGeneralCustomer(
    @Args('createGeneralCustomerData')
    createGeneralCustomerData: CreateConsumerDto,
  ): Promise<GeneralCustomer> {
    return this.commandBus.execute(
      new CreateEntityWithEventCommand(
        GeneralCustomer,
        createGeneralCustomerData,
        GeneralCustomerEvent,
      ),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateGeneralCustomer(
    @Args('updateGeneralCustomerData')
    updateGeneralCustomerData: PatchConsumerDto,
  ): Promise<GeneralCustomer> {
    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        GeneralCustomer,
        updateGeneralCustomerData,
        updateGeneralCustomerData.id,
        GeneralCustomerEvent,
      ),
    );
  }
}
