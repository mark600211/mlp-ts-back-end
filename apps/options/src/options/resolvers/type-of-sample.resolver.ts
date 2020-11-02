import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  Option,
  TypeOfSample,
  PatchOption,
  TypeOfSampleBase,
  TryCatchWrapper,
  TryCatchWrapperAsync,
  TypeOfSampleEvent,
} from '@app/models';
import { Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => TypeOfSample)
export class TypeOfSampleResolver {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  typeOfSamples(): Promise<TypeOfSample[]> {
    return this.queryBus.execute(new GetEntitiesQuery(TypeOfSample));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newTypeOfSample(@Args('lable') lable: string): Promise<TypeOfSample> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(TypeOfSample, data, TypeOfSampleEvent),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateTypeOfSample(
    @Args('data') data: PatchOption,
  ): Promise<TypeOfSample> {
    const updateData: TypeOfSampleBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        TypeOfSample,
        updateData,
        data.id,
        TypeOfSample,
      ),
    );
  }
}
