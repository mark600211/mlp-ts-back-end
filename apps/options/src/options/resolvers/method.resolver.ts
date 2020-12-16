import { Method, NewOption, PatchOption } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Method)
export class MethodResolver extends BaseResolver(
  Method,
  NewOption,
  PatchOption,
) {
  constructor() {
    super();
  }
}
