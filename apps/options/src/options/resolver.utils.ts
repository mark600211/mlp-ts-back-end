import {
  Addition,
  ClimaticEnvironmental,
  DefinedIndicator,
  EnvironmentalEngineer,
  Goal,
  InformationAboutSelection,
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
  Addition,
  ClimaticEnvironmental,
  DefinedIndicator,
  EnvironmentalEngineer,
  Goal,
  InformationAboutSelection,
  Method,
  NormativeDocument,
  ObjectName,
  PassedSample,
  Place,
  Planning,
  Preparation,
  Representative,
  SampleType,
  Sample,
  ToolType,
  TypeOfSample,
];

export const ResolverUtils = types.map(type => {
  return { classRef: type, serviceDataRef: OptionsService };
});
