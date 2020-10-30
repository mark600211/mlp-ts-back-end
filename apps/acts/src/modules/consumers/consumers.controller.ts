import {
  AdditionAct,
  AdditionBase,
  ClimaticEnvironmentalAct,
  ClimaticEnvironmentalBase,
  CustomerAct,
  CustomerBase,
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
import { createConsumerEventPattern } from './consumers.decocrators';
import { ConsumersService } from './consumers.service';
import { ConsumerController } from './interfaces/controller.interface';
import { MessageConsumerController } from './interfaces/message.interface';

@Controller('consumers')
export class ConsumersController implements ConsumerController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly consumerService: ConsumersService) {}

  @createConsumerEventPattern(
    CONSUMERS.CUSTOMER,
    new Logger('ConsumerController'),
  )
  handleNewCustomer(
    @Payload() message: MessageConsumerController<CustomerBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(CustomerAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.GENERAL_CUSTOMER,
    new Logger('ConsumerController'),
  )
  handleNewGeneralCustomer(
    @Payload() message: MessageConsumerController<GeneralCustomerBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(GeneralCustomerAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(CONSUMERS.LAB, new Logger('ConsumerController'))
  handleNewLab(@Payload() message: MessageConsumerController<LabBase>): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(LabAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.TYPE_OF_SAMPLE,
    new Logger('ConsumerController'),
  )
  handleNewTypeOfSample(
    @Payload() message: MessageConsumerController<TypeOfSampleBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(TypeOfSampleAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.OBJECT_NAME,
    new Logger('ConsumerController'),
  )
  handleNewObjectName(
    @Payload() message: MessageConsumerController<ObjectNameBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(ObjectNameAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(CONSUMERS.PLACE, new Logger('ConsumerController'))
  handleNewPlace(
    @Payload() message: MessageConsumerController<PlaceBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(PlaceAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.METHOD,
    new Logger('ConsumerController'),
  )
  handleNewMethod(
    @Payload() message: MessageConsumerController<MethodBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(MethodAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.TOOL_TYPE,
    new Logger('ConsumerController'),
  )
  handleNewToolType(
    @Payload() message: MessageConsumerController<ToolTypeBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(ToolTypeAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.CLIMATIC_ENVIRONMENTAL,
    new Logger('ConsumerController'),
  )
  handleNewClimanticEnvironmetal(
    @Payload() message: MessageConsumerController<ClimaticEnvironmentalBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(ClimaticEnvironmentalAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.PLANNING,
    new Logger('ConsumerController'),
  )
  handleNewPlanning(
    @Payload() message: MessageConsumerController<PlanningBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(PlanningAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.NORMATIVE_DOCUMENT,
    new Logger('ConsumerController'),
  )
  handleNewNormativeDocument(
    @Payload() message: MessageConsumerController<NormativeDocumentBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(NormativeDocumentAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.SAMPLE_TYPE,
    new Logger('ConsumerController'),
  )
  handleNewSampleType(
    @Payload() message: MessageConsumerController<SampleTypeBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(SampleTypeAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.SAMPLE,
    new Logger('ConsumerController'),
  )
  handleNewSample(
    @Payload() message: MessageConsumerController<SampleBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(SampleAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.PREPARATION,
    new Logger('ConsumerController'),
  )
  handleNewPreparation(
    @Payload() message: MessageConsumerController<PreparationBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(PreparationAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(CONSUMERS.GOAL, new Logger('ConsumerController'))
  handleNewGoal(@Payload() message: MessageConsumerController<GoalBase>): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(GoalAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.DEFINED_INDICATORS,
    new Logger('ConsumerController'),
  )
  handleNewDefinedIndicator(
    @Payload() message: MessageConsumerController<DefinedIndicatorBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(DefinedIndicatorAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.ADDITIONS,
    new Logger('ConsumerController'),
  )
  handleNewAddition(
    @Payload() message: MessageConsumerController<AdditionBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(AdditionAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.INFORMATION_ABOUT_SELECTION,
    new Logger('ConsumerController'),
  )
  handleNewInformationAboutSelection(
    @Payload()
    message: MessageConsumerController<InformationAboutSelectionBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(
        InformationAboutSelectionAct,
        payload,
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.ENVIRONMENTAL_ENGINEER,
    new Logger('ConsumerController'),
  )
  handleNewEnvironmentalEngineer(
    @Payload() message: MessageConsumerController<EnvironmentalEngineerBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(EnvironmentalEngineerAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.REPRESENTATIVE,
    new Logger('ConsumerController'),
  )
  handleNewRepresentative(
    @Payload() message: MessageConsumerController<RepresentativeBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(RepresentativeAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @createConsumerEventPattern(
    CONSUMERS.PASSED_SAMPLE,
    new Logger('ConsumerController'),
  )
  handleNewPassedSample(
    @Payload() message: MessageConsumerController<PassedSampleBase>,
  ): void {
    const {
      value: { payload },
    } = message;

    try {
      this.consumerService.createConsumer(PassedSampleAct, payload);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
