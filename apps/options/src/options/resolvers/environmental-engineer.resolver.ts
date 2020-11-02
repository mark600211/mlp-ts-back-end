import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  EnvironmentalEngineer,
  EnvironmentalEngineerBase,
  EnvironmentalEngineerEvent,
  Option,
  PatchOption,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => EnvironmentalEngineer)
export class EnvironmentalEngineerResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  environmentalEngineers(): Promise<EnvironmentalEngineer[]> {
    return this.queryBus.execute(new GetEntitiesQuery(EnvironmentalEngineer));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newEnvironmentalEngineer(
    @Args('lable') lable: string,
  ): Promise<EnvironmentalEngineer> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(
        EnvironmentalEngineer,
        data,
        EnvironmentalEngineerEvent,
      ),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateEnvironmentalEngineer(
    @Args('data') data: PatchOption,
  ): Promise<EnvironmentalEngineer> {
    const updateData: EnvironmentalEngineerBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        EnvironmentalEngineerEvent,
        updateData,
        data.id,
        EnvironmentalEngineer,
      ),
    );
  }
}
