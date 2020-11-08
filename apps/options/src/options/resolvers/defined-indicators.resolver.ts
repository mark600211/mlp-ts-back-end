/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DefinedIndicator,
  DefinedIndicatorEvent,
  NewDefinedIndicator,
  PatchDefinedIndicator,
} from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => DefinedIndicator)
export class DefinedIndicatorResolver extends BaseResolver(
  DefinedIndicator,
  NewDefinedIndicator,
  PatchDefinedIndicator,
  true,
  DefinedIndicatorEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   definedIndicators(): Promise<DefinedIndicator[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(DefinedIndicator));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newDefinedIndicator(
  //     @Args('data') data: NewDefinedIndicator,
  //   ): Promise<DefinedIndicator> {
  //     const consumers = await this.optService.getConsumers(data);

  //     const newData: DefinedIndicatorRelations = {
  //       ...consumers,
  //       lable: data.lable,
  //     };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(
  //         DefinedIndicator,
  //         newData,
  //         DefinedIndicatorEvent,
  //       ),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updateDefinedIndicator(
  //     @Args('data') data: PatchDefinedIndicator,
  //   ): Promise<DefinedIndicator> {
  //     const consumers = await this.optService.getConsumers(data);

  //     const updateData: DefinedIndicatorRelations = {
  //       ...consumers,
  //       lable: data.lable,
  //     };

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         DefinedIndicator,
  //         updateData,
  //         data.id,
  //         DefinedIndicatorEvent,
  //       ),
  //     );
  //   }
}
