import {
  ClimaticEnvironmental,
  ClimaticEnvironmentalEvent,
  NewOption,
  PatchOption,
} from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => ClimaticEnvironmental)
export class ClimaticEnvironmentalResolver extends BaseResolver(
  ClimaticEnvironmental,
  NewOption,
  PatchOption,
  true,
  ClimaticEnvironmentalEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   ClimaticEnvironmentals(): Promise<ClimaticEnvironmental[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(ClimaticEnvironmental));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newClimaticEnvironmental(
  //     @Args('lable') lable: string,
  //   ): Promise<ClimaticEnvironmental> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(
  //         ClimaticEnvironmental,
  //         data,
  //         ClimaticEnvironmentalEvent,
  //       ),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updateClimaticEnvironmental(
  //     @Args('data') data: PatchOption,
  //   ): Promise<ClimaticEnvironmental> {
  //     const updateData: ClimaticEnvironmentalBase = data;

  //     const payload = (await this.commandBus.execute(
  //       new UpdateEntityCommand(ClimaticEnvironmental, updateData, data.id),
  //     )) as ClimaticEnvironmental;

  //     this.eventBus.publish(
  //       new EntityCreatedEvent(
  //         ClimaticEnvironmental,
  //         payload,
  //         payload.id,
  //         payload.id,
  //       ),
  //     );

  //     return payload;
  //   }
}
