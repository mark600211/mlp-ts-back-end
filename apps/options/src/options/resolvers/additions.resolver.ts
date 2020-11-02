import {
  CreateEntityWithEventCommand,
  UpdateEntityWithEventCommand,
  GetEntitiesQuery,
} from '@app/cqrs';
import {
  Addition,
  AdditionBase,
  AdditionEvent,
  Option,
  PatchOption,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => Addition)
export class AdditionResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  additions(): Promise<Addition[]> {
    return this.queryBus.execute(new GetEntitiesQuery(Addition));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newAddition(@Args('lable') lable: string): Promise<Addition> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(Addition, data, AdditionEvent),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateAddition(@Args('data') data: PatchOption): Promise<Addition> {
    const updateData: AdditionBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        Addition,
        updateData,
        data.id,
        AdditionEvent,
      ),
    );
  }
}
