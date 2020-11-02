import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  Option,
  PassedSample,
  PassedSampleBase,
  PassedSampleEvent,
  PatchOption,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => PassedSample)
export class PassedSampleResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  passedSamples(): Promise<PassedSample[]> {
    return this.queryBus.execute(new GetEntitiesQuery(PassedSample));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newPassedSample(@Args('lable') lable: string): Promise<PassedSample> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(PassedSample, data, PassedSampleEvent),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updatePassedSample(
    @Args('data') data: PatchOption,
  ): Promise<PassedSample> {
    const updateData: PassedSampleBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        PassedSample,
        updateData,
        data.id,
        PassedSampleEvent,
      ),
    );
  }
}
