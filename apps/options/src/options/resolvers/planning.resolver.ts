import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  Option,
  PatchOption,
  Planning,
  PlanningBase,
  PlanningEvent,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => Planning)
export class PlanningResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  plannings(): Promise<Planning[]> {
    return this.queryBus.execute(new GetEntitiesQuery(Planning));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newPlanning(@Args('lable') lable: string): Promise<Planning> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(Planning, data, PlanningEvent),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updatePlanning(@Args('data') data: PatchOption): Promise<Planning> {
    const updateData: PlanningBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        Planning,
        updateData,
        data.id,
        PlanningEvent,
      ),
    );
  }
}
