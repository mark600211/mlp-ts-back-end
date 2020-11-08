import {
  EnvironmentalEngineer,
  EnvironmentalEngineerEvent,
  PatchOption,
} from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => EnvironmentalEngineer)
export class EnvironmentalEngineerResolver extends BaseResolver(
  EnvironmentalEngineer,
  String,
  PatchOption,
  true,
  EnvironmentalEngineerEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   environmentalEngineers(): Promise<EnvironmentalEngineer[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(EnvironmentalEngineer));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newEnvironmentalEngineer(
  //     @Args('lable') lable: string,
  //   ): Promise<EnvironmentalEngineer> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(
  //         EnvironmentalEngineer,
  //         data,
  //         EnvironmentalEngineerEvent,
  //       ),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updateEnvironmentalEngineer(
  //     @Args('data') data: PatchOption,
  //   ): Promise<EnvironmentalEngineer> {
  //     const updateData: EnvironmentalEngineerBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         EnvironmentalEngineerEvent,
  //         updateData,
  //         data.id,
  //         EnvironmentalEngineer,
  //       ),
  //     );
  //   }
}
