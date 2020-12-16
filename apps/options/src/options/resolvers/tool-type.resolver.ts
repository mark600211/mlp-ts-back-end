import { NewOption, PatchOption, ToolType } from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => ToolType)
export class ToolTypeResolver extends BaseResolver(
  ToolType,
  NewOption,
  PatchOption,
) {
  constructor() {
    super();
  }
}
