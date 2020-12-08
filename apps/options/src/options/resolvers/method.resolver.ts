import { Method, MethodEvent, NewOption, PatchOption } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Method)
export class MethodResolver extends BaseResolver(
  Method,
  NewOption,
  PatchOption,
  true,
  MethodEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   methods(): Promise<Method[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(Method));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newMethod(@Args('lable') lable: string): Promise<Method> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(Method, data, MethodEvent),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updateMethod(@Args('data') data: PatchOption): Promise<Method> {
  //     const updateData: MethodBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         Method,
  //         updateData,
  //         data.id,
  //         MethodEvent,
  //       ),
  //     );
  //   }
}
