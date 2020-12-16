import { DefinedIndicatorResolver } from './defined-indicators.resolver';
import { EnvironmentalEngineerResolver } from './environmental-engineer.resolver';
import { GoalResolver } from './goal.resolver';
import { MethodResolver } from './method.resolver';
import { NormativeDocumentResolver } from './normative-document.resolver';
import { PassedSampleResolver } from './passed-sample.resolver';
import { PlaceResolver } from './place.resolver';
import {
  ClimaticEnvironmentalResolver,
  ObjectNameResolver,
  PlanningResolver,
  SampleResolver,
} from './resolvers.resolver';
import { PreparationResolver } from './preparation.resolver';
import { RepresentativeResolver } from './representative.resolver';
import { SampleTypeResolver } from './sample-type.resolver';
import { ToolTypeResolver } from './tool-type.resolver';
import { TypeOfSampleResolver } from './type-of-sample.resolver';

export const Resolvers = [
  ClimaticEnvironmentalResolver,
  DefinedIndicatorResolver,
  EnvironmentalEngineerResolver,
  GoalResolver,
  MethodResolver,
  NormativeDocumentResolver,
  ObjectNameResolver,
  PassedSampleResolver,
  PlaceResolver,
  PlanningResolver,
  PreparationResolver,
  RepresentativeResolver,
  SampleResolver,
  SampleTypeResolver,
  ToolTypeResolver,
  TypeOfSampleResolver,
];
