import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  DefinedIndicator,
  DefinedIndicatorEvent,
  DefinedIndicatorRelations,
  NewDefinedIndicator,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { PatchDefinedIndicator } from '@app/models/models/options/dto/patch-defined-indicator.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OptionsService } from '../options.service';

@Resolver(of => DefinedIndicator)
export class DefinedIndicatorResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly optService: OptionsService,
  ) {}

  @TryCatchWrapper()
  @Query()
  definedIndicators(): Promise<DefinedIndicator[]> {
    return this.queryBus.execute(new GetEntitiesQuery(DefinedIndicator));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newDefinedIndicator(
    @Args('data') data: NewDefinedIndicator,
  ): Promise<DefinedIndicator> {
    const consumers = await this.optService.getConsumers(data);

    const newData: DefinedIndicatorRelations = {
      ...consumers,
      lable: data.lable,
    };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(
        DefinedIndicator,
        newData,
        DefinedIndicatorEvent,
      ),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateDefinedIndicator(
    @Args('data') data: PatchDefinedIndicator,
  ): Promise<DefinedIndicator> {
    const consumers = await this.optService.getConsumers(data);

    const updateData: DefinedIndicatorRelations = {
      ...consumers,
      lable: data.lable,
    };

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        DefinedIndicator,
        updateData,
        data.id,
        DefinedIndicatorEvent,
      ),
    );
  }
}
