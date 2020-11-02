import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Act, NewActDto, PatchActDto, TryCatchWrapperAsync } from '@app/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateEntityCommand,
  GetEntitiesQuery,
  GetEntityQuery,
  UpdateEntityCommand,
} from '@app/cqrs';
import { ActsService } from './acts.service';

@Resolver(of => Act)
export class ActResolver {
  constructor(
    private commandBus: CommandBus,
    private queryHandler: QueryBus,
    private actService: ActsService,
  ) {}

  @TryCatchWrapperAsync()
  @Query(returns => [Act], { nullable: 'itemsAndList' })
  async getActs(): Promise<Act[]> {
    return this.commandBus.execute(new GetEntitiesQuery(Act));
  }

  @TryCatchWrapperAsync()
  @Query(returns => Act)
  async getAct(@Args('id') id: string): Promise<Act> {
    return this.commandBus.execute(new GetEntityQuery(Act, id));
  }

  @TryCatchWrapperAsync()
  @Mutation(returns => Act)
  async createAct(@Args('newActData') newActData: NewActDto): Promise<Act> {
    const data = this.actService.newActData(newActData);

    return await this.commandBus.execute(new CreateEntityCommand(Act, data));
  }

  @TryCatchWrapperAsync()
  @Mutation(returns => Act)
  async updateAct(
    @Args('updateActData') updateActData: PatchActDto,
  ): Promise<Act> {
    const data = this.actService.updateActData(updateActData);

    return await this.commandBus.execute(
      new UpdateEntityCommand(Act, data, updateActData.id),
    );
  }
}
