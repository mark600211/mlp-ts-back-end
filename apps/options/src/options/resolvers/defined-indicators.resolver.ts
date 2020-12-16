/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DefinedIndicator,
  NewDefinedIndicator,
  PatchDefinedIndicator,
  WhereDefinedIndicator,
} from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => DefinedIndicator)
export class DefinedIndicatorResolver extends BaseResolver(
  DefinedIndicator,
  NewDefinedIndicator,
  PatchDefinedIndicator,
  WhereDefinedIndicator,
) {
  constructor() {
    super();
  }
}
