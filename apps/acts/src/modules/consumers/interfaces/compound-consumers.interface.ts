import {
  AdditionAct,
  Application,
  ApplicationBase,
  ClimaticEnvironmentalAct,
  Consumer,
  CustomerAct,
  DefinedIndicatorAct,
  DefinedIndicatorBase,
  EnvironmentalEngineerAct,
  GeneralCustomerAct,
  GoalAct,
  InformationAboutSelectionAct,
  LabAct,
  MethodAct,
  NormativeDocumentAct,
  ObjectNameAct,
  Option,
  PassedSampleAct,
  PlaceAct,
  PlanningAct,
  PreparationAct,
  RepresentativeAct,
  SampleAct,
  SampleTypeAct,
  ToolTypeAct,
  TypeOfSampleAct,
} from '@app/models';

export type CompoundConsumersType =
  | typeof CustomerAct
  | typeof GeneralCustomerAct
  | typeof LabAct
  | typeof TypeOfSampleAct
  | typeof ObjectNameAct
  | typeof PlaceAct
  | typeof MethodAct
  | typeof ToolTypeAct
  | typeof ClimaticEnvironmentalAct
  | typeof PlanningAct
  | typeof NormativeDocumentAct
  | typeof SampleTypeAct
  | typeof SampleAct
  | typeof PreparationAct
  | typeof GoalAct
  | typeof DefinedIndicatorAct
  | typeof AdditionAct
  | typeof InformationAboutSelectionAct
  | typeof EnvironmentalEngineerAct
  | typeof RepresentativeAct
  | typeof PassedSampleAct
  | typeof Application;

export type CompoundConsumersBaseType =
  | typeof Consumer
  | typeof Option
  | typeof ApplicationBase
  | typeof DefinedIndicatorBase;

export interface CompoundConsumers {
  entityType: CompoundConsumersType;
  dataType: CompoundConsumersBaseType;
}
