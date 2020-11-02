import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  InformationAboutSelection,
  InformationAboutSelectionBase,
  InformationAboutSelectionEvent,
  Option,
  PatchOption,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => InformationAboutSelection)
export class InformationAboutSelectionResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  informationAboutSelections(): Promise<InformationAboutSelection[]> {
    return this.queryBus.execute(
      new GetEntitiesQuery(InformationAboutSelection),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newInformationAboutSelection(
    @Args('lable') lable: string,
  ): Promise<InformationAboutSelection> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(
        InformationAboutSelection,
        data,
        InformationAboutSelectionEvent,
      ),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateInformationAboutSelection(
    @Args('data') data: PatchOption,
  ): Promise<InformationAboutSelection> {
    const updateData: InformationAboutSelectionBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        InformationAboutSelection,
        updateData,
        data.id,
        InformationAboutSelectionEvent,
      ),
    );
  }
}
