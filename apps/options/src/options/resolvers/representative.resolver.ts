import {
  NewOption,
  PatchOption,
  Representative,
  RepresentativeEvent,
} from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Representative)
export class RepresentativeResolver extends BaseResolver(
  Representative,
  NewOption,
  PatchOption,
  true,
  RepresentativeEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   representatives(): Promise<Representative[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(Representative));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newRepresentative(
  //     @Args('lable') lable: string,
  //   ): Promise<Representative> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(
  //         Representative,
  //         data,
  //         RepresentativeEvent,
  //       ),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updateRepresentative(
  //     @Args('data') data: PatchOption,
  //   ): Promise<Representative> {
  //     const updateData: RepresentativeBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         Representative,
  //         updateData,
  //         data.id,
  //         RepresentativeEvent,
  //       ),
  //     );
  //   }
}
