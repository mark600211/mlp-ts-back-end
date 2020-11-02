import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  Option,
  PatchOption,
  ToolType,
  ToolTypeBase,
  ToolTypeEvent,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => ToolType)
export class ToolTypeResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  toolTypes(): Promise<ToolType[]> {
    return this.queryBus.execute(new GetEntitiesQuery(ToolType));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newToolType(@Args('lable') lable: string): Promise<ToolType> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(ToolType, data, ToolTypeEvent),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateToolType(@Args('data') data: PatchOption): Promise<ToolType> {
    const updateData: ToolTypeBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        ToolType,
        updateData,
        data.id,
        ToolTypeEvent,
      ),
    );
  }
}
