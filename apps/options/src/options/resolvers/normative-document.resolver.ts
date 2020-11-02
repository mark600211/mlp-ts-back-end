import {
  CreateEntityWithEventCommand,
  GetEntitiesQuery,
  UpdateEntityWithEventCommand,
} from '@app/cqrs';
import {
  NormativeDocument,
  NormativeDocumentBase,
  NormativeDocumentEvent,
  Option,
  PatchOption,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(of => NormativeDocument)
export class NormativeDocumentResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @TryCatchWrapper()
  @Query()
  normativeDocuments(): Promise<NormativeDocument[]> {
    return this.queryBus.execute(new GetEntitiesQuery(NormativeDocument));
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async newNormativeDocument(
    @Args('lable') lable: string,
  ): Promise<NormativeDocument> {
    const data: Option = { lable };

    return this.commandBus.execute(
      new CreateEntityWithEventCommand(
        NormativeDocument,
        data,
        NormativeDocumentEvent,
      ),
    );
  }

  @TryCatchWrapperAsync()
  @Mutation()
  async updateNormativeDocument(
    @Args('data') data: PatchOption,
  ): Promise<NormativeDocument> {
    const updateData: NormativeDocumentBase = data;

    return this.commandBus.execute(
      new UpdateEntityWithEventCommand(
        NormativeDocument,
        updateData,
        data.id,
        NormativeDocumentEvent,
      ),
    );
  }
}
