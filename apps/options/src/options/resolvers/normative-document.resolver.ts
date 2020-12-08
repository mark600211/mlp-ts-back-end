import {
  NewOption,
  NormativeDocument,
  NormativeDocumentEvent,
  PatchOption,
} from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => NormativeDocument)
export class NormativeDocumentResolver extends BaseResolver(
  NormativeDocument,
  NewOption,
  PatchOption,
  true,
  NormativeDocumentEvent,
) {
  constructor() {
    super();
  }

  //   @TryCatchWrapper()
  //   @Query()
  //   normativeDocuments(): Promise<NormativeDocument[]> {
  //     return this.queryBus.execute(new GetEntitiesQuery(NormativeDocument));
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async newNormativeDocument(
  //     @Args('lable') lable: string,
  //   ): Promise<NormativeDocument> {
  //     const data: Option = { lable };

  //     return this.commandBus.execute(
  //       new CreateEntityWithEventCommand(
  //         NormativeDocument,
  //         data,
  //         NormativeDocumentEvent,
  //       ),
  //     );
  //   }

  //   @TryCatchWrapperAsync()
  //   @Mutation()
  //   async updateNormativeDocument(
  //     @Args('data') data: PatchOption,
  //   ): Promise<NormativeDocument> {
  //     const updateData: NormativeDocumentBase = data;

  //     return this.commandBus.execute(
  //       new UpdateEntityWithEventCommand(
  //         NormativeDocument,
  //         updateData,
  //         data.id,
  //         NormativeDocumentEvent,
  //       ),
  //     );
  //   }
}
