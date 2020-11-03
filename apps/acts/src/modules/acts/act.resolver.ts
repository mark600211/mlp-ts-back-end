import { Resolver } from '@nestjs/graphql';
import { Act, NewActDto, PatchActDto } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Logger } from '@nestjs/common';

@Resolver(of => Act)
export class ActResolver extends BaseResolver(
  Act,
  NewActDto,
  PatchActDto,
  false,
) {
  logger = new Logger('tst');
  constructor() {
    super();
  }

  //   @TryCatchWrapperAsync()
  //   @Query(returns => [Act], { nullable: 'itemsAndList' })
  //   async getActs(): Promise<Act[]> {
  //     this.logger.verbose('atga');

  //     return this.queryBus.execute(new GetEntitiesQuery(Act));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Query(returns => Act)
  //   async getAct(@Args('id') id: string): Promise<Act> {
  //     return this.commandBus.execute(new GetEntityQuery(Act, id));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation(returns => Act)
  //   async createAct(@Args('newActData') newActData: NewActDto): Promise<Act> {
  //     const data = this.actService.newActData(newActData);

  //     return await this.commandBus.execute(new CreateEntityCommand(Act, data));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation(returns => Act)
  //   async updateAct(
  //     @Args('updateActData') updateActData: PatchActDto,
  //   ): Promise<Act> {
  //     const data = this.actService.updateActData(updateActData);

  //     return await this.commandBus.execute(
  //       new UpdateEntityCommand(Act, data, updateActData.id),
  //     );
  //   }
}
