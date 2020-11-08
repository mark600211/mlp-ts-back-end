import { PatchOption, Sample, SampleEvent } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Sample)
export class SampleResolver extends BaseResolver(
  Sample,
  String,
  PatchOption,
  true,
  SampleEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   samples(): Promise<[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(Sample));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newSample(@Args('lable') lable: string): Promise<Sample> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(Sample, data, SampleEvent),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updateSample(@Args('data') data: PatchOption): Promise<Sample> {
  //     const updateData: SampleBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         Sample,
  //         updateData,
  //         data.id,
  //         SampleEvent,
  //       ),
  //     );
  //   }
}
