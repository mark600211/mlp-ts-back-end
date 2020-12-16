import { NewOption, PatchOption, SampleType } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => SampleType)
export class SampleTypeResolver extends BaseResolver(
  SampleType,
  NewOption,
  PatchOption,
) {
  constructor() {
    super();
  }
}
