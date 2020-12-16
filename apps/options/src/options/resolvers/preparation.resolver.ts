import { NewOption, PatchOption, Preparation } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Preparation)
export class PreparationResolver extends BaseResolver(
  Preparation,
  NewOption,
  PatchOption,
) {
  constructor() {
    super();
  }
}
