import {
  NewOption,
  PassedSample,
  PassedSampleEvent,
  PatchOption,
} from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => PassedSample)
export class PassedSampleResolver extends BaseResolver(
  PassedSample,
  NewOption,
  PatchOption,
  true,
  PassedSampleEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   passedSamples(): Promise<PassedSample[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(PassedSample));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newPassedSample(@Args('lable') lable: string): Promise<PassedSample> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(PassedSample, data, PassedSampleEvent),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updatePassedSample(
  //     @Args('data') data: PatchOption,
  //   ): Promise<PassedSample> {
  //     const updateData: PassedSampleBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         PassedSample,
  //         updateData,
  //         data.id,
  //         PassedSampleEvent,
  //       ),
  //     );
  //   }
}
