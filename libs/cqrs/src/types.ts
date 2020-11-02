import {
  Addition,
  AdditionEvent,
  ClimaticEnvironmental,
  ClimaticEnvironmentalEvent,
  Customer,
  CustomerEvent,
  DefinedIndicator,
  DefinedIndicatorEvent,
  EnvironmentalEngineer,
  EnvironmentalEngineerEvent,
  GeneralCustomer,
  GeneralCustomerEvent,
  Goal,
  GoalEvent,
  InformationAboutSelection,
  InformationAboutSelectionEvent,
  Lab,
  LabEvent,
  LabId,
  Method,
  MethodEvent,
  NormativeDocument,
  NormativeDocumentEvent,
  ObjectName,
  ObjectNameEvent,
  Option,
  PassedSample,
  PassedSampleEvent,
  Place,
  PlaceEvent,
  Planning,
  PlanningEvent,
  Preparation,
  PreparationEvent,
  Representative,
  Sample,
  SampleEvent,
  SampleType,
  ToolType,
  ToolTypeEvent,
  TypeOfSample,
  TypeOfSampleEvent,
} from '@app/models';

export type EventTypes =
  | CustomerEvent
  | GeneralCustomerEvent
  | LabEvent
  | AdditionEvent
  | ClimaticEnvironmentalEvent
  | DefinedIndicatorEvent
  | EnvironmentalEngineerEvent
  | GoalEvent
  | InformationAboutSelectionEvent
  | MethodEvent
  | NormativeDocumentEvent
  | ObjectNameEvent
  | PassedSampleEvent
  | PlaceEvent
  | PlanningEvent
  | PreparationEvent
  | SampleEvent
  | SampleType
  | ToolTypeEvent
  | TypeOfSampleEvent;

export type ConsumersType =
  | Customer
  | GeneralCustomer
  | Lab
  | Addition
  | ClimaticEnvironmental
  | DefinedIndicator
  | LabId
  | EnvironmentalEngineer
  | Goal
  | InformationAboutSelection
  | Method
  | NormativeDocument
  | ObjectName
  | PassedSample
  | Place
  | Planning
  | Preparation
  | Representative
  | SampleType
  | Sample
  | ToolType
  | TypeOfSample;

export type NewDataType = Option;
