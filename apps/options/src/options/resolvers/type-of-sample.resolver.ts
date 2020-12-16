import { NewOption, PatchOption, TypeOfSample } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => TypeOfSample)
export class TypeOfSampleResolver extends BaseResolver(
  TypeOfSample,
  NewOption,
  PatchOption,
) {
  constructor() {
    super();
  }
}
