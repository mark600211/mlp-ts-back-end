import {
  ClimaticEnvironmental,
  DefinedIndicator,
  EnvironmentalEngineer,
  Goal,
  Method,
  NormativeDocument,
  ObjectName,
  PassedSample,
  Place,
  Planning,
  Preparation,
  Representative,
  Sample,
  SampleType,
  ToolType,
  TypeOfSample,
} from '@app/models';
import { OptionsService } from './options.service';

const types = [
  ClimaticEnvironmental,
  DefinedIndicator,
  EnvironmentalEngineer,
  Goal,
  Method,
  NormativeDocument,
  ObjectName,
  PassedSample,
  Place,
  Planning,
  Preparation,
  Representative,
  Sample,
  SampleType,
  ToolType,
  TypeOfSample,
];

export const ResolverUtils = types.map(type => {
  return { classRef: type, serviceDataRef: OptionsService };
});
