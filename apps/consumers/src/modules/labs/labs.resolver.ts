import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  GetEntityQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  CreateConsumerDto,
  Lab,
  LabEvent,
  PatchConsumerDto,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => Lab)
export class LabResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapperAsync()
  @Query()
  async labs(): Promise<Lab[]> {
    return this.queryBus.execute(new GetEntitiesQuery(Lab));
  }

  @TryCatchWrapperAsync()
  @Query()
  async lab(@Args('id') id: string): Promise<Lab> {
    return this.queryBus.execute(new GetEntityQuery(Lab, id));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async createLab(
    @Args('createLabData') createLabData: CreateConsumerDto,
  ): Promise<Lab> {
    return this.commandBus.execute(
      new CreateEntityWithEventCommand(Lab, createLabData, LabEvent),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateLab(
    @Args('updataLabData') updateLabData: PatchConsumerDto,
  ): Promise<Lab> {
    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        Lab,
        updateLabData,
        updateLabData.id,
        LabEvent,
      ),
    );
  }
}
