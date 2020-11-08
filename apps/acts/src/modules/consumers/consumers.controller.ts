import { EntitiesService } from '@app/commands';
import {
  AdditionAct,
  AdditionBase,
  ClimaticEnvironmentalAct,
  ClimaticEnvironmentalBase,
  CustomerAct,
  CustomerBase,
  DefinedIndicator,
  DefinedIndicatorAct,
  DefinedIndicatorBase,
  EnvironmentalEngineerAct,
  EnvironmentalEngineerBase,
  GeneralCustomerAct,
  GeneralCustomerBase,
  GoalAct,
  GoalBase,
  InformationAboutSelectionAct,
  InformationAboutSelectionBase,
  LabAct,
  LabBase,
  MethodAct,
  MethodBase,
  NormativeDocumentAct,
  NormativeDocumentBase,
  ObjectNameAct,
  ObjectNameBase,
  PassedSampleAct,
  PassedSampleBase,
  PlaceAct,
  PlaceBase,
  PlanningAct,
  PlanningBase,
  PreparationAct,
  PreparationBase,
  RepresentativeAct,
  RepresentativeBase,
  SampleAct,
  SampleBase,
  SampleTypeAct,
  SampleTypeBase,
  ToolTypeAct,
  ToolTypeBase,
  TypeOfSampleAct,
  TypeOfSampleBase,
} from '@app/models';
import { CONSUMERS } from '@app/models/enum/consumers.enum';
import { Controller, Logger } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  createConsumerEventPattern,
  updateConsumerEventPattern,
} from './consumers.decocrators';
import { MessageConsumerController } from './interfaces/message.interface';

@Controller('consumers')
export class ConsumersController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly entities: EntitiesService) {}

  @createConsumerEventPattern(CONSUMERS.CUSTOMER)
  handleNewCustomer(
    @Payload() message: MessageConsumerController<CustomerBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(CustomerAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.CUSTOMER)
  handleUpdateCustomer(
    @Payload() message: MessageConsumerController<CustomerBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(CustomerAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.GENERAL_CUSTOMER)
  handleNewGeneralCustomer(
    @Payload() message: MessageConsumerController<GeneralCustomerBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(GeneralCustomerAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.GENERAL_CUSTOMER)
  handleUpdateGeneralCustomer(
    @Payload() message: MessageConsumerController<GeneralCustomerBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(GeneralCustomerAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.LAB)
  handleNewLab(@Payload() message: MessageConsumerController<LabBase>): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(LabAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.LAB)
  handleUpdateLab(
    @Payload() message: MessageConsumerController<LabBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(LabAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.TYPE_OF_SAMPLE)
  handleNewTypeOfSample(
    @Payload() message: MessageConsumerController<TypeOfSampleBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(TypeOfSampleAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.TYPE_OF_SAMPLE)
  handleUpdateTypeOfSample(
    @Payload() message: MessageConsumerController<TypeOfSampleBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(TypeOfSampleAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.OBJECT_NAME)
  handleNewObjectName(
    @Payload() message: MessageConsumerController<ObjectNameBase>,
  ): void {
    const {
      value: { payload },
    } = message;
    this.entities.createEntity(ObjectNameAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.OBJECT_NAME)
  handleUdateObjectName(
    @Payload() message: MessageConsumerController<ObjectNameBase>,
  ): void {
    const {
      value: { payload },
    } = message;
    this.entities.updateEntityById(ObjectNameAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.PLACE)
  handleNewPlace(
    @Payload() message: MessageConsumerController<PlaceBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(PlaceAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.PLACE)
  handleUpdatePlace(
    @Payload() message: MessageConsumerController<PlaceBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(PlaceAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.METHOD)
  handleNewMethod(
    @Payload() message: MessageConsumerController<MethodBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(MethodAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.METHOD)
  handleUpdateMethod(
    @Payload() message: MessageConsumerController<MethodBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(MethodAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.TOOL_TYPE)
  handleNewToolType(
    @Payload() message: MessageConsumerController<ToolTypeBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(ToolTypeAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.TOOL_TYPE)
  handleUpdateToolType(
    @Payload() message: MessageConsumerController<ToolTypeBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(ToolTypeAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.CLIMATIC_ENVIRONMENTAL)
  handleNewClimanticEnvironmetal(
    @Payload() message: MessageConsumerController<ClimaticEnvironmentalBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(ClimaticEnvironmentalAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.CLIMATIC_ENVIRONMENTAL)
  handleUpdateClimanticEnvironmetal(
    @Payload() message: MessageConsumerController<ClimaticEnvironmentalBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(
      ClimaticEnvironmentalAct,
      payload,
      payload.id,
    );
  }

  @createConsumerEventPattern(CONSUMERS.PLANNING)
  handleNewPlanning(
    @Payload() message: MessageConsumerController<PlanningBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(PlanningAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.PLANNING)
  handleUpdatePlanning(
    @Payload() message: MessageConsumerController<PlanningBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(PlanningAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.NORMATIVE_DOCUMENT)
  handleNewNormativeDocument(
    @Payload() message: MessageConsumerController<NormativeDocumentBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(NormativeDocumentAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.NORMATIVE_DOCUMENT)
  handleUpdateNormativeDocument(
    @Payload() message: MessageConsumerController<NormativeDocumentBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(NormativeDocumentAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.SAMPLE_TYPE)
  handleNewSampleType(
    @Payload() message: MessageConsumerController<SampleTypeBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(SampleTypeAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.SAMPLE_TYPE)
  handleUpdateSampleType(
    @Payload() message: MessageConsumerController<SampleTypeBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(SampleTypeAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.SAMPLE)
  handleNewSample(
    @Payload() message: MessageConsumerController<SampleBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(SampleAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.SAMPLE)
  handleUpdateSample(
    @Payload() message: MessageConsumerController<SampleBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(SampleAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.PREPARATION)
  handleNewPreparation(
    @Payload() message: MessageConsumerController<PreparationBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(PreparationAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.PREPARATION)
  handleUpdatePreparation(
    @Payload() message: MessageConsumerController<PreparationBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(PreparationAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.GOAL)
  handleNewGoal(@Payload() message: MessageConsumerController<GoalBase>): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(GoalAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.GOAL)
  handleUpdateGoal(
    @Payload() message: MessageConsumerController<GoalBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(GoalAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.DEFINED_INDICATORS)
  handleNewDefinedIndicator(
    @Payload() message: MessageConsumerController<DefinedIndicatorBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(DefinedIndicatorAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.DEFINED_INDICATORS)
  handleUpdateDefinedIndicator(
    @Payload() message: MessageConsumerController<DefinedIndicator>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(DefinedIndicatorAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.ADDITIONS)
  handleNewAddition(
    @Payload() message: MessageConsumerController<AdditionBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(AdditionAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.ADDITIONS)
  handleUpdateAddition(
    @Payload() message: MessageConsumerController<AdditionBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(AdditionAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.INFORMATION_ABOUT_SELECTION)
  handleNewInformationAboutSelection(
    @Payload()
    message: MessageConsumerController<InformationAboutSelectionBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(InformationAboutSelectionAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.INFORMATION_ABOUT_SELECTION)
  handleUpdateInformationAboutSelection(
    @Payload()
    message: MessageConsumerController<InformationAboutSelectionBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(
      InformationAboutSelectionAct,
      payload,
      payload.id,
    );
  }

  @createConsumerEventPattern(CONSUMERS.ENVIRONMENTAL_ENGINEER)
  handleNewEnvironmentalEngineer(
    @Payload() message: MessageConsumerController<EnvironmentalEngineerBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(EnvironmentalEngineerAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.ENVIRONMENTAL_ENGINEER)
  handleUpdateEnvironmentalEngineer(
    @Payload() message: MessageConsumerController<EnvironmentalEngineerBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(
      EnvironmentalEngineerAct,
      payload,
      payload.id,
    );
  }

  @createConsumerEventPattern(CONSUMERS.REPRESENTATIVE)
  handleNewRepresentative(
    @Payload() message: MessageConsumerController<RepresentativeBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(RepresentativeAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.REPRESENTATIVE)
  handleUpdateRepresentative(
    @Payload() message: MessageConsumerController<RepresentativeBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(RepresentativeAct, payload, payload.id);
  }

  @createConsumerEventPattern(CONSUMERS.PASSED_SAMPLE)
  handleNewPassedSample(
    @Payload() message: MessageConsumerController<PassedSampleBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.createEntity(PassedSampleAct, payload);
  }

  @updateConsumerEventPattern(CONSUMERS.PASSED_SAMPLE)
  handleUdatePassedSample(
    @Payload() message: MessageConsumerController<PassedSampleBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    this.entities.updateEntityById(PassedSampleAct, payload, payload.id);
  }
}
