import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  Option,
  PatchOption,
  Place,
  PlaceBase,
  PlaceEvent,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => Place)
export class PlaceResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  places(): Promise<Place[]> {
    return this.queryBus.execute(new GetEntitiesQuery(Place));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newPlace(@Args('lable') lable: string): Promise<Place> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(Place, data, PlaceEvent),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updatePlace(@Args('data') data: PatchOption): Promise<Place> {
    const updateData: PlaceBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(Place, updateData, data.id, PlaceEvent),
    );
  }
}
