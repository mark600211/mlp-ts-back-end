import { NewOption, NormativeDocument, PatchOption } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => NormativeDocument)
export class NormativeDocumentResolver extends BaseResolver(
  NormativeDocument,
  NewOption,
  PatchOption,
) {
  constructor() {
    super();
  }
}
