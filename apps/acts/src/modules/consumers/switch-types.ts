import { TypeKey } from './enum/type-key';
import {
  ApplicationBase,
  Consumer,
  Customer,
  DefinedIndicator,
  EnvironmentalEngineer,
  GeneralCustomer,
  Goal,
  Lab,
  Method,
  NormativeDocument,
  Option,
  PassedSample,
  Place,
  Preparation,
  Representative,
  SampleType,
  ToolType,
  TypeOfSample,
} from '@app/models';

export class SwitchTypes {
  private key: TypeKey;

  entityType:
    | Customer
    | typeof GeneralCustomer
    | typeof Lab
    | typeof TypeOfSample
    | typeof Place
    | typeof Method
    | typeof ToolType
    | typeof NormativeDocument
    | typeof SampleType
    | typeof Preparation
    | typeof Goal
    | typeof DefinedIndicator
    | typeof EnvironmentalEngineer
    | typeof Representative
    | typeof PassedSample
    | typeof ApplicationBase;

  dataType: Consumer | Option | ApplicationBase | DefinedIndicator;

  constructor(key: TypeKey) {
    this.key = key;
    this.handleEntityType();
  }

  private handleEntityType() {
    switch (this.key) {
      case TypeKey.GENERAL_CUSTOMER:
        this.entityType = GeneralCustomer;
        this.dataType = new Consumer();
        break;
      case TypeKey.CUSTOMER:
        this.entityType = Customer;
        this.dataType = new Consumer();
        break;
      case TypeKey.LAB:
        this.entityType = Lab;
        this.dataType = new Consumer();
        break;
      case TypeKey.TYPE_OF_SAMPLE:
        this.entityType = TypeOfSample;
        this.dataType = new Option();
        break;
      case TypeKey.PLACE:
        this.entityType = Place;
        this.dataType = new Option();
        break;
      case TypeKey.METHOD:
        this.entityType = Method;
        this.dataType = new Option();
        break;
      case TypeKey.TOOL_TYPE:
        this.entityType = ToolType;
        this.dataType = new Option();
        break;
      case TypeKey.NORMATIVE_DOCUMENT:
        this.entityType = NormativeDocument;
        this.dataType = new Option();
        break;
      case TypeKey.SAMPLE_TYPE:
        this.entityType = SampleType;
        this.dataType = new Option();
        break;
      case TypeKey.PREPARATION:
        this.entityType = Preparation;
        this.dataType = new Option();
        break;
      case TypeKey.GOAL:
        this.entityType = Goal;
        this.dataType = new Option();
        break;
      case TypeKey.DEFINED_INDICATORS:
        this.entityType = DefinedIndicator;
        this.dataType = new DefinedIndicator();
        break;
      case TypeKey.ENVIRONMENTAL_ENGINEER:
        this.entityType = EnvironmentalEngineer;
        this.dataType = new Option();
        break;
      case TypeKey.REPRESENTATIVE:
        this.entityType = Representative;
        this.dataType = new Option();
        break;
      case TypeKey.PASSED_SAMPLE:
        this.entityType = PassedSample;
        this.dataType = new Option();
        break;
      case TypeKey.APPLICATION:
        this.entityType = ApplicationBase;
        this.dataType = new ApplicationBase();
        break;
    }
  }
}
