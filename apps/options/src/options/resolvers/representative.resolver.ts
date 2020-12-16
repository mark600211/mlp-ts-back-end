import { NewOption, PatchOption, Representative } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Representative)
export class RepresentativeResolver extends BaseResolver(
  Representative,
  NewOption,
  PatchOption,
) {
  constructor() {
    super();
  }
}
