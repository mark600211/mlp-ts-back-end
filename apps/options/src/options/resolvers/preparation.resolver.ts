import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  Option,
  PatchOption,
  Preparation,
  PreparationBase,
  PreparationEvent,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => Preparation)
export class PreparationResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  preparations(): Promise<Preparation[]> {
    return this.queryBus.execute(new GetEntitiesQuery(Preparation));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newPreparation(@Args('lable') lable: string): Promise<Preparation> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(Preparation, data, PreparationEvent),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updatePreparation(
    @Args('data') data: PatchOption,
  ): Promise<Preparation> {
    const updateData: PreparationBase = data;
    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        Preparation,
        updateData,
        data.id,
        PreparationEvent,
      ),
    );
  }
}
