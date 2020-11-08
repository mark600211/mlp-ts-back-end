import { PatchOption, ToolType, ToolTypeEvent } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => ToolType)
export class ToolTypeResolver extends BaseResolver(
  ToolType,
  String,
  PatchOption,
  true,
  ToolTypeEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   toolTypes(): Promise<ToolType[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(ToolType));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newToolType(@Args('lable') lable: string): Promise<ToolType> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(ToolType, data, ToolTypeEvent),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updateToolType(@Args('data') data: PatchOption): Promise<ToolType> {
  //     const updateData: ToolTypeBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         ToolType,
  //         updateData,
  //         data.id,
  //         ToolTypeEvent,
  //       ),
  //     );
  //   }
}
