import { Goal, NewOption, PatchOption } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Goal)
export class GoalResolver extends BaseResolver(Goal, NewOption, PatchOption) {
  constructor() {
    super();
  }
}
