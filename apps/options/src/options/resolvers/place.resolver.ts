import { PatchOption, Place, PlaceEvent } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Place)
export class PlaceResolver extends BaseResolver(
  Place,
  String,
  PatchOption,
  true,
  PlaceEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   places(): Promise<Place[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(Place));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newPlace(@Args('lable') lable: string): Promise<Place> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(Place, data, PlaceEvent),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updatePlace(@Args('data') data: PatchOption): Promise<Place> {
  //     const updateData: PlaceBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(Place, updateData, data.id, PlaceEvent),
  //     );
  //   }
}
