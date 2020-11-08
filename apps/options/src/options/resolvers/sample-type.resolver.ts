import { PatchOption, SampleType, SampleTypeEvent } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => SampleType)
export class SampleTypeResolver extends BaseResolver(
  SampleType,
  String,
  PatchOption,
  true,
  SampleTypeEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   sampleTypes(): Promise<SampleType[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(SampleType));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newSampleType(@Args('lable') lable: string): Promise<SampleType> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(SampleType, data, SampleTypeEvent),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updateSampleType(@Args('data') data: PatchOption): Promise<SampleType> {
  //     const updateData: SampleTypeBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         SampleType,
  //         updateData,
  //         data.id,
  //         SampleTypeEvent,
  //       ),
  //     );
  //   }
}
