import { Logger } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Act, NewActDto, PatchActDto } from '@app/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetActQuery, GetActsQuery } from './queries';
import { NewActCommand, UpdateActCommand } from './commands';

@Resolver(of => Act)
export class ActResolver {
  logger = new Logger(this.constructor.name);

  constructor(private commandBus: CommandBus, private queryHandler: QueryBus) {}

  @Query(returns => [Act], { nullable: 'itemsAndList' })
  async getActs(): Promise<Act[]> {
    this.logger.verbose('get-acts');

    try {
      return this.commandBus.execute(new GetActsQuery());
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Query(returns => Act)
  async getAct(@Args('id') id: string): Promise<Act> {
    this.logger.verbose('get-act');

    try {
      return this.commandBus.execute(new GetActQuery(id));
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Mutation(returns => Act)
  async createAct(@Args('newActData') newActData: NewActDto): Promise<Act> {
    this.logger.verbose(`create act with ${newActData}`);

    try {
      return await this.commandBus.execute(new NewActCommand(newActData));
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Mutation(returns => Act)
  async updateAct(
    @Args('updateActData') updateActData: PatchActDto,
  ): Promise<Act> {
    this.logger.verbose(
      `update mutation with data: ${JSON.stringify(updateActData, null, 2)}`,
    );
    return await this.commandBus.execute(new UpdateActCommand(updateActData));
  }
}
