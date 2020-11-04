import { Resolver } from '@nestjs/graphql';
import { Application, PatchAppDto } from '@app/models';
import { BaseResolver } from '@app/resolvers';

@Resolver(of => Application)
export class ApplicationResolver extends BaseResolver(
  Application,
  PatchAppDto,
  PatchAppDto,
) {}
