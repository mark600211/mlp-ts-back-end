import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Act, NewActDto, PatchActDto, TryCatchWrapperAsync } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Logger } from '@nestjs/common';
import { TableContent } from './models/table-content.model';
import { TableConditions } from './models/table-conditions.dto';
import { ActsService } from './acts.service';

@Resolver(of => Act)
export class ActResolver extends BaseResolver(Act, NewActDto, PatchActDto) {
  logger = new Logger('tst');
  constructor(private actsService: ActsService) {
    super();
  }

  @Query(type => TableContent)
  @TryCatchWrapperAsync()
  async getTableContent(
    @Args('conditions') tableConditions: TableConditions,
  ): Promise<TableContent> {
    return this.actsService.getTableContent(tableConditions);
  }

  @Mutation(type => Boolean)
  @TryCatchWrapperAsync()
  async copyManyActsByIds(
    @Args('ids', { type: () => [String] }) ids: [string],
    @Args('num') num: number,
  ): Promise<boolean> {
    return this.actsService.copyManyActsByIds(ids, num);
  }
}
