import { EnvironmentalEngineer, NewOption, PatchOption } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => EnvironmentalEngineer)
export class EnvironmentalEngineerResolver extends BaseResolver(
  EnvironmentalEngineer,
  NewOption,
  PatchOption,
) {
  constructor() {
    super();
  }
}
