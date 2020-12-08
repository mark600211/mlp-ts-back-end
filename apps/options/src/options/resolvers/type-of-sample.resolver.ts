import {
  NewOption,
  PatchOption,
  TypeOfSample,
  TypeOfSampleEvent,
} from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => TypeOfSample)
export class TypeOfSampleResolver extends BaseResolver(
  TypeOfSample,
  NewOption,
  PatchOption,
  true,
  TypeOfSampleEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   typeOfSamples(): Promise<TypeOfSample[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(TypeOfSample));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newTypeOfSample(@Args('lable') lable: string): Promise<TypeOfSample> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(TypeOfSample, data, TypeOfSampleEvent),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updateTypeOfSample(
  //     @Args('data') data: PatchOption,
  //   ): Promise<TypeOfSample> {
  //     const updateData: TypeOfSampleBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         TypeOfSample,
  //         updateData,
  //         data.id,
  //         TypeOfSample,
  //       ),
  //     );
  //   }
}
