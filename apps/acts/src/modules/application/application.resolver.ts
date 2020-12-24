import { Resolver } from '@nestjs/graphql';
import { ApplicationBase, NewAppDto, PatchAppDto } from '@app/models';
import { BaseResolver } from '@app/resolvers';

@Resolver(of => ApplicationBase)
export class ApplicationResolver extends BaseResolver(
  ApplicationBase,
  NewAppDto,
  PatchAppDto,
) {}
