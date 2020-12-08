import {
  InformationAboutSelection,
  InformationAboutSelectionEvent,
  NewOption,
  PatchOption,
} from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => InformationAboutSelection)
export class InformationAboutSelectionResolver extends BaseResolver(
  InformationAboutSelection,
  NewOption,
  PatchOption,
  true,
  InformationAboutSelectionEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   informationAboutSelections(): Promise<InformationAboutSelection[]> {
  //     return this.queryBus.execute(
  //       new GetEntitiesQuery(InformationAboutSelection),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newInformationAboutSelection(
  //     @Args('lable') lable: string,
  //   ): Promise<InformationAboutSelection> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(
  //         InformationAboutSelection,
  //         data,
  //         InformationAboutSelectionEvent,
  //       ),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updateInformationAboutSelection(
  //     @Args('data') data: PatchOption,
  //   ): Promise<InformationAboutSelection> {
  //     const updateData: InformationAboutSelectionBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         InformationAboutSelection,
  //         updateData,
  //         data.id,
  //         InformationAboutSelectionEvent,
  //       ),
  //     );
  //   }
}
