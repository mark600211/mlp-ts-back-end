import { NewOption, PatchOption, Place } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Place)
export class PlaceResolver extends BaseResolver(Place, NewOption, PatchOption) {
  constructor() {
    super();
  }
}
