import { NewOption, PassedSample, PatchOption } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => PassedSample)
export class PassedSampleResolver extends BaseResolver(
  PassedSample,
  NewOption,
  PatchOption,
) {
  constructor() {
    super();
  }
}
