import { Goal, GoalEvent, NewOption, PatchOption } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Goal)
export class GoalResolver extends BaseResolver(
  Goal,
  NewOption,
  PatchOption,
  true,
  GoalEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   goals(): Promise<Goal[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(Goal));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newGoal(@Args('lable') lable: string): Promise<Goal> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(Goal, data, GoalEvent),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updateGoal(@Args('data') data: PatchOption): Promise<Goal> {
  //     const updateData: GoalBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(Goal, updateData, data.id, GoalEvent),
  //     );
  //   }
}
