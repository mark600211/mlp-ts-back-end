import {
  ClimaticEnvironmental,
  ObjectName,
  Planning,
  Sample,
} from '@app/models';
import { BaseResolver } from '@app/resolvers';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Planning)
export class PlanningResolver extends BaseResolver(Planning) {
  constructor() {
    super();
  }
}

@Resolver(of => ObjectName)
export class ObjectNameResolver extends BaseResolver(ObjectName) {
  constructor() {
    super();
  }
}

@Resolver(of => ClimaticEnvironmental)
export class ClimaticEnvironmentalResolver extends BaseResolver(
  ClimaticEnvironmental,
) {
  constructor() {
    super();
  }
}

@Resolver(of => Sample)
export class SampleResolver extends BaseResolver(Sample) {
  constructor() {
    super();
  }
}
