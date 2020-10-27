import {
  CustomerAct,
  GeneralCustomerAct,
  LabAct,
  PlaceAct,
  TypeOfSampleAct,
  ObjectNameAct,
  MethodAct,
  ToolTypeAct,
  ClimaticEnvironmentalAct,
  PlanningBase,
  NormativeDocumentBase,
  SampleTypeAct,
  SampleAct,
  PreparationAct,
  GoalAct,
  DefinedIndicatorAct,
  AdditionAct,
  InformationAboutSelectionAct,
  EnvironmentalEngineerAct,
  RepresentativeAct,
  PassedSampleAct,
  Application,
} from '@app/models';

export interface AllConsumers {
  customer?: CustomerAct;
  generalCustomer?: GeneralCustomerAct;
  lab?: LabAct;
  typeOfSample?: TypeOfSampleAct;
  objectName?: ObjectNameAct;
  place?: PlaceAct;
  method?: MethodAct;
  toolType?: ToolTypeAct;
  climaticEnvironmental?: ClimaticEnvironmentalAct;
  planning?: PlanningBase;
  normativeDocument?: NormativeDocumentBase[];
  sampleType?: SampleTypeAct;
  sample?: SampleAct[];
  preparation?: PreparationAct[];
  goal?: GoalAct;
  definedIndicators?: DefinedIndicatorAct[];
  additions?: AdditionAct;
  informationAboutSelection?: InformationAboutSelectionAct;
  environmentalEngineer?: EnvironmentalEngineerAct;
  representative?: RepresentativeAct;
  passedSample?: PassedSampleAct;
  applications: Application[];
}
