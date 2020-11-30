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
  SampleTypeAct,
  SampleAct,
  PreparationAct,
  GoalAct,
  DefinedIndicatorsAct,
  AdditionAct,
  InformationAboutSelectionAct,
  EnvironmentalEngineerAct,
  RepresentativeAct,
  PassedSampleAct,
  Application,
  PlanningAct,
  NormativeDocumentAct,
} from '@app/models';

export interface AllConsumersPatch {
  customer: CustomerAct;
  generalCustomer: GeneralCustomerAct;
  lab: LabAct;
  typeOfSample: TypeOfSampleAct;
  objectName?: ObjectNameAct;
  place?: PlaceAct;
  method?: MethodAct;
  toolType?: ToolTypeAct;
  climaticEnvironmental?: ClimaticEnvironmentalAct;
  planning?: PlanningAct;
  normativeDocument?: NormativeDocumentAct[];
  sampleType?: SampleTypeAct;
  sample?: SampleAct[];
  preparation?: PreparationAct[];
  goal?: GoalAct;
  definedIndicators?: DefinedIndicatorsAct[];
  additions?: AdditionAct;
  informationAboutSelection?: InformationAboutSelectionAct;
  environmentalEngineer?: EnvironmentalEngineerAct;
  representative?: RepresentativeAct;
  passedSample?: PassedSampleAct;
  applications: Application[];
}
