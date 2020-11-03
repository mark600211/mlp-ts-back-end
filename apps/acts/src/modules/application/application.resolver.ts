import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Application,
  PatchAppDto,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { Logger } from '@nestjs/common';
import { BaseResolver } from '@app/resolvers';

@Resolver(of => Application)
export class ApplicationResolver extends BaseResolver(
  Application,
  PatchAppDto,
  PatchAppDto,
  false,
) {
  //   @TryCatchWrapperAsync()
  //   @Query(returns => [Application])
  //   async getAllApplication(): Promise<Application[]> {
  //     return await this.queryBus.execute(new GetEntitiesQuery(Application));
  //   }
  //   @TryCatchWrapperAsync()
  //   @Mutation(returns => Application)
  //   async createApplication(
  //     @Args('data') data: PatchAppDto,
  //   ): Promise<Application> {
  //     return await this.commandBus.execute(
  //       new CreateEntityCommand(Application, data),
  //     );
  //   }
  //   @TryCatchWrapper()
  //   @Mutation(returns => Application, { nullable: true })
  //   deleteApplication(@Args('id') id: string): void {
  //     this.commandBus.execute(new DeleteEntityCommand(Application, id));
  //   }
}
