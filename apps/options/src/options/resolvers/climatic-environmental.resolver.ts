import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityCommand,
} from '@app/cqrs';
import { EntityCreatedEvent } from '@app/cqrs/events';
import {
  ClimaticEnvironmental,
  ClimaticEnvironmentalBase,
  ClimaticEnvironmentalEvent,
  Option,
  PatchOption,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => ClimaticEnvironmental)
export class ClimaticEnvironmentalResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  ClimaticEnvironmentals(): Promise<ClimaticEnvironmental[]> {
    return this.queryBus.execute(new GetEntitiesQuery(ClimaticEnvironmental));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newClimaticEnvironmental(
    @Args('lable') lable: string,
  ): Promise<ClimaticEnvironmental> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(
        ClimaticEnvironmental,
        data,
        ClimaticEnvironmentalEvent,
      ),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateClimaticEnvironmental(
    @Args('data') data: PatchOption,
  ): Promise<ClimaticEnvironmental> {
    const updateData: ClimaticEnvironmentalBase = data;

    const payload = (await this.commandBus.execute(
      new UpdateEntityCommand(ClimaticEnvironmental, updateData, data.id),
    )) as ClimaticEnvironmental;

    this.eventBus.publish(
      new EntityCreatedEvent(
        ClimaticEnvironmental,
        payload,
        payload.id,
        payload.id,
      ),
    );

    return payload;
  }
}
