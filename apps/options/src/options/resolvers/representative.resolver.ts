import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  Option,
  PatchOption,
  Representative,
  RepresentativeBase,
  RepresentativeEvent,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => Representative)
export class RepresentativeResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  representatives(): Promise<Representative[]> {
    return this.queryBus.execute(new GetEntitiesQuery(Representative));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newRepresentative(
    @Args('lable') lable: string,
  ): Promise<Representative> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(
        Representative,
        data,
        RepresentativeEvent,
      ),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateRepresentative(
    @Args('data') data: PatchOption,
  ): Promise<Representative> {
    const updateData: RepresentativeBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        Representative,
        updateData,
        data.id,
        RepresentativeEvent,
      ),
    );
  }
}
