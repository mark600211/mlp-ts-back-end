import { ObjectName, ObjectNameEvent, PatchOption } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => ObjectName)
export class ObjectNameResolver extends BaseResolver(
  ObjectName,
  String,
  PatchOption,
  true,
  ObjectNameEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   objectNames(): Promise<ObjectName[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(ObjectName));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newObjectName(@Args('lable') lable: string): Promise<ObjectName> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(ObjectName, data, ObjectNameEvent),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updateObjectName(@Args('data') data: PatchOption): Promise<ObjectName> {
  //     const updateData: ObjectNameBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         ObjectName,
  //         updateData,
  //         data.id,
  //         ObjectNameEvent,
  //       ),
  //     );
  //   }
}
