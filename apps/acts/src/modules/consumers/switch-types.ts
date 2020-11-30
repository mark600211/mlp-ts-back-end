import { TypeKey } from './enum/type-key';
import {
  AdditionAct,
  Application,
  ApplicationBase,
  ClimaticEnvironmentalAct,
  Consumer,
  CustomerAct,
  DefinedIndicatorsAct,
  DefinedIndicatorsBase,
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

export class SwitchTypes {
  private key: TypeKey;

  entityType:
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
    | typeof DefinedIndicatorsAct
    | typeof AdditionAct
    | typeof InformationAboutSelectionAct
    | typeof EnvironmentalEngineerAct
    | typeof RepresentativeAct
    | typeof PassedSampleAct
    | typeof Application;

  dataType: Consumer | Option | ApplicationBase | DefinedIndicatorsBase;

  constructor(key: TypeKey) {
    this.key = key;
    this.handleEntityType();
  }

  private handleEntityType() {
    switch (this.key) {
      case TypeKey.GENERAL_CUSTOMER:
        this.entityType = GeneralCustomerAct;
        this.dataType = new Consumer();
        break;
      case TypeKey.CUSTOMER:
        this.entityType = CustomerAct;
        this.dataType = new Consumer();
        break;
      case TypeKey.LAB:
        this.entityType = LabAct;
        this.dataType = new Consumer();
        break;
      case TypeKey.TYPE_OF_SAMPLE:
        this.entityType = TypeOfSampleAct;
        this.dataType = new Option();
        break;
      case TypeKey.OBJECT_NAME:
        this.entityType = ObjectNameAct;
        this.dataType = new Option();
        break;
      case TypeKey.PLACE:
        this.entityType = PlaceAct;
        this.dataType = new Option();
        break;
      case TypeKey.METHOD:
        this.entityType = MethodAct;
        this.dataType = new Option();
        break;
      case TypeKey.TOOL_TYPE:
        this.entityType = ToolTypeAct;
        this.dataType = new Option();
        break;
      case TypeKey.CLIMATIC_ENVIRONMENTAL:
        this.entityType = ClimaticEnvironmentalAct;
        this.dataType = new Option();
        break;
      case TypeKey.PLANNING:
        this.entityType = PlanningAct;
        this.dataType = new Option();
        break;
      case TypeKey.NORMATIVE_DOCUMENT:
        this.entityType = NormativeDocumentAct;
        this.dataType = new Option();
        break;
      case TypeKey.SAMPLE_TYPE:
        this.entityType = SampleTypeAct;
        this.dataType = new Option();
        break;
      case TypeKey.SAMPLE:
        this.entityType = SampleAct;
        this.dataType = new Option();
        break;
      case TypeKey.PREPARATION:
        this.entityType = PreparationAct;
        this.dataType = new Option();
        break;
      case TypeKey.GOAL:
        this.entityType = GoalAct;
        this.dataType = new Option();
        break;
      case TypeKey.DEFINED_INDICATORS:
        this.entityType = DefinedIndicatorsAct;
        this.dataType = new DefinedIndicatorsBase();
        break;
      case TypeKey.ADDITIONS:
        this.entityType = AdditionAct;
        this.dataType = new Option();
      case TypeKey.INFORMATION_ABOUT_SELECTION:
        this.entityType = InformationAboutSelectionAct;
        this.dataType = new Option();
        break;
      case TypeKey.ENVIRONMENTAL_ENGINEER:
        this.entityType = EnvironmentalEngineerAct;
        this.dataType = new Option();
        break;
      case TypeKey.REPRESENTATIVE:
        this.entityType = RepresentativeAct;
        this.dataType = new Option();
        break;
      case TypeKey.PASSED_SAMPLE:
        this.entityType = PassedSampleAct;
        this.dataType = new Option();
        break;
      case TypeKey.APPLICATION:
        this.entityType = Application;
        this.dataType = new ApplicationBase();
        break;
    }
  }
}
