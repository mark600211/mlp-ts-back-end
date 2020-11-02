import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  Method,
  MethodBase,
  MethodEvent,
  Option,
  PatchOption,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => Method)
export class MethodResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  methods(): Promise<Method[]> {
    return this.queryBus.execute(new GetEntitiesQuery(Method));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newMethod(@Args('lable') lable: string): Promise<Method> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(Method, data, MethodEvent),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateMethod(@Args('data') data: PatchOption): Promise<Method> {
    const updateData: MethodBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        Method,
        updateData,
        data.id,
        MethodEvent,
      ),
    );
  }
}
