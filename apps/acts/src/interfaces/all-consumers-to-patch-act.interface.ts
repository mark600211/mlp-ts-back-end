import {
  Customer,
  GeneralCustomer,
  Lab,
  Place,
  TypeOfSample,
  ObjectName,
  Method,
  ToolType,
  ClimaticEnvironmental,
  SampleType,
  Preparation,
  Goal,
  DefinedIndicator,
  EnvironmentalEngineer,
  Representative,
  PassedSample,
  Application,
  Planning,
  NormativeDocument,
} from '@app/models';

export interface AllConsumersPatch {
  customer: Customer;
  generalCustomer: GeneralCustomer;
  lab: Lab;
  typeOfSample: TypeOfSample;
  objectName?: ObjectName;
  place?: Place;
  method?: Method;
  toolType?: ToolType;
  climaticEnvironmental?: ClimaticEnvironmental;
  planning?: Planning;
  normativeDocument?: NormativeDocument[];
  sampleType?: SampleType;
  sample?: string;
  preparation?: Preparation[];
  goal?: Goal;
  definedIndicators?: DefinedIndicator[];
  additions?: string;
  informationAboutSelection?: string;
  environmentalEngineer?: EnvironmentalEngineer;
  representative?: Representative;
  passedSample?: PassedSample;
  applications: Application[];
}
