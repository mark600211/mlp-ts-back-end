import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  ObjectName,
  ObjectNameBase,
  ObjectNameEvent,
  Option,
  PatchOption,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => ObjectName)
export class ObjectNameResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  objectNames(): Promise<ObjectName[]> {
    return this.queryBus.execute(new GetEntitiesQuery(ObjectName));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newObjectName(@Args('lable') lable: string): Promise<ObjectName> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(ObjectName, data, ObjectNameEvent),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateObjectName(@Args('data') data: PatchOption): Promise<ObjectName> {
    const updateData: ObjectNameBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        ObjectName,
        updateData,
        data.id,
        ObjectNameEvent,
      ),
    );
  }
}
