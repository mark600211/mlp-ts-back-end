import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  Option,
  PatchOption,
  Sample,
  SampleBase,
  SampleEvent,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => Sample)
export class SampleResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  samples(): Promise<[]> {
    return this.queryBus.execute(new GetEntitiesQuery(Sample));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newSample(@Args('lable') lable: string): Promise<Sample> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(Sample, data, SampleEvent),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateSample(@Args('data') data: PatchOption): Promise<Sample> {
    const updateData: SampleBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        Sample,
        updateData,
        data.id,
        SampleEvent,
      ),
    );
  }
}
