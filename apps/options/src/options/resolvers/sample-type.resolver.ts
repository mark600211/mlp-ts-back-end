import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  Option,
  PatchOption,
  SampleType,
  SampleTypeBase,
  SampleTypeEvent,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => SampleType)
export class SampleTypeResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  sampleTypes(): Promise<SampleType[]> {
    return this.queryBus.execute(new GetEntitiesQuery(SampleType));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newSampleType(@Args('lable') lable: string): Promise<SampleType> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(SampleType, data, SampleTypeEvent),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateSampleType(@Args('data') data: PatchOption): Promise<SampleType> {
    const updateData: SampleTypeBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        SampleType,
        updateData,
        data.id,
        SampleTypeEvent,
      ),
    );
  }
}
