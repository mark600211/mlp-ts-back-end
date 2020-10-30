import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Application, PatchAppDto } from '@app/models';
import { Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllApplicationsQuery } from './queries';
import { CreateAppCommand, DeleteAppCommand } from './commands';

@Resolver(of => Application)
export class ApplicationResolver {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(returns => [Application])
  async getAllApplication(): Promise<Application[]> {
    this.logger.verbose('get-all-application');

    try {
      return await this.queryBus.execute(new GetAllApplicationsQuery());
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Mutation(returns => Application)
  async createApplication(
    @Args('data') data: PatchAppDto,
  ): Promise<Application> {
    this.logger.verbose('create-application.mutation');

    try {
      return await this.commandBus.execute(new CreateAppCommand(data));
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Mutation(returns => Application, { nullable: true })
  deleteApplication(@Args('id') id: string): void {
    this.logger.verbose('delete-application.mutation');

    try {
      this.commandBus.execute(new DeleteAppCommand(id));
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
