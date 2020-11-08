import { Addition, AdditionEvent, PatchOption } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Addition)
export class AdditionResolver extends BaseResolver(
  Addition,
  String,
  PatchOption,
  true,
  AdditionEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   additions(): Promise<Addition[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(Addition));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newAddition(@Args('lable') lable: string): Promise<Addition> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(Addition, data, AdditionEvent),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updateAddition(@Args('data') data: PatchOption): Promise<Addition> {
  //     const updateData: AdditionBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         Addition,
  //         updateData,
  //         data.id,
  //         AdditionEvent,
  //       ),
  //     );
  //   }
}
