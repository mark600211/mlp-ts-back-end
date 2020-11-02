import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  Goal,
  GoalBase,
  GoalEvent,
  Option,
  PatchOption,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => Goal)
export class GoalResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  goals(): Promise<Goal[]> {
    return this.queryBus.execute(new GetEntitiesQuery(Goal));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newGoal(@Args('lable') lable: string): Promise<Goal> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(Goal, data, GoalEvent),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateGoal(@Args('data') data: PatchOption): Promise<Goal> {
    const updateData: GoalBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(Goal, updateData, data.id, GoalEvent),
    );
  }
}
