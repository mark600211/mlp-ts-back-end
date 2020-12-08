import { NewOption, PatchOption, Planning, PlanningEvent } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Planning)
export class PlanningResolver extends BaseResolver(
  Planning,
  NewOption,
  PatchOption,
  true,
  PlanningEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   plannings(): Promise<Planning[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(Planning));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newPlanning(@Args('lable') lable: string): Promise<Planning> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(Planning, data, PlanningEvent),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updatePlanning(@Args('data') data: PatchOption): Promise<Planning> {
  //     const updateData: PlanningBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         Planning,
  //         updateData,
  //         data.id,
  //         PlanningEvent,
  //       ),
  //     );
  //   }
}
