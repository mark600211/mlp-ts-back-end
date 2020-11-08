import { PatchOption, Preparation, PreparationEvent } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Preparation)
export class PreparationResolver extends BaseResolver(
  Preparation,
  String,
  PatchOption,
  true,
  PreparationEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   preparations(): Promise<Preparation[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(Preparation));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newPreparation(@Args('lable') lable: string): Promise<Preparation> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(Preparation, data, PreparationEvent),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updatePreparation(
  //     @Args('data') data: PatchOption,
  //   ): Promise<Preparation> {
  //     const updateData: PreparationBase = data;
  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         Preparation,
  //         updateData,
  //         data.id,
  //         PreparationEvent,
  //       ),
  //     );
  //   }
}
