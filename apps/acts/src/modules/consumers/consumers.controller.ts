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
  DefinedIndicatorRelations,
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
import { CommandBus } from '@nestjs/cqrs';
import { Payload } from '@nestjs/microservices';
import { ActsController } from '../acts/acts.controller';
import { TestService } from '../acts/test.service';
import {
  createConsumerEventPattern,
  updateConsumerEventPattern,
} from './consumers.decocrators';
import { ConsumerController } from './interfaces/controller.interface';
import { MessageConsumerController } from './interfaces/message.interface';

@Controller('consumers')
export class ConsumersController {
  logger = new Logger(this.constructor.name);

  //   constructor(private readonly commandBus: CommandBus) {}

  // @createConsumerEventPattern(CONSUMERS.CUSTOMER)
  // handleNewCustomer(
  //   @Payload() message: MessageConsumerController<CustomerBase>,
  // ): void {
  //   const {
  //     value: { payload },
  //   } = message;

  //   this.commandBus.execute(new CreateEntityCommand(CustomerAct, payload));
  // }

  //   @updateConsumerEventPattern(CONSUMERS.CUSTOMER)
  //   handleUpdateCustomer(
  //     @Payload() message: MessageConsumerController<CustomerBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(CustomerAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.GENERAL_CUSTOMER)
  //   handleNewGeneralCustomer(
  //     @Payload() message: MessageConsumerController<GeneralCustomerBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new CreateEntityCommand(GeneralCustomerAct, payload),
  //     );
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.GENERAL_CUSTOMER)
  //   handleUpdateGeneralCustomer(
  //     @Payload() message: MessageConsumerController<GeneralCustomerBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(GeneralCustomerAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.LAB)
  //   handleNewLab(@Payload() message: MessageConsumerController<LabBase>): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(new CreateEntityCommand(LabAct, payload));
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.LAB)
  //   handleUpdateLab(
  //     @Payload() message: MessageConsumerController<LabBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(LabAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.TYPE_OF_SAMPLE)
  //   handleNewTypeOfSample(
  //     @Payload() message: MessageConsumerController<TypeOfSampleBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(new CreateEntityCommand(TypeOfSampleAct, payload));
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.TYPE_OF_SAMPLE)
  //   handleUpdateTypeOfSample(
  //     @Payload() message: MessageConsumerController<TypeOfSampleBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(TypeOfSampleAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.OBJECT_NAME)
  //   handleNewObjectName(
  //     @Payload() message: MessageConsumerController<ObjectNameBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;
  //     this.commandBus.execute(new CreateEntityCommand(ObjectNameAct, payload));
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.OBJECT_NAME)
  //   handleUdateObjectName(
  //     @Payload() message: MessageConsumerController<ObjectNameBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;
  //     this.commandBus.execute(
  //       new UpdateEntityCommand(ObjectNameAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.PLACE)
  //   handleNewPlace(
  //     @Payload() message: MessageConsumerController<PlaceBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(new CreateEntityCommand(PlaceAct, payload));
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.PLACE)
  //   handleUpdatePlace(
  //     @Payload() message: MessageConsumerController<PlaceBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(PlaceAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.METHOD)
  //   handleNewMethod(
  //     @Payload() message: MessageConsumerController<MethodBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(new CreateEntityCommand(MethodAct, payload));
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.METHOD)
  //   handleUpdateMethod(
  //     @Payload() message: MessageConsumerController<MethodBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(MethodAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.TOOL_TYPE)
  //   handleNewToolType(
  //     @Payload() message: MessageConsumerController<ToolTypeBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(new CreateEntityCommand(ToolTypeAct, payload));
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.TOOL_TYPE)
  //   handleUpdateToolType(
  //     @Payload() message: MessageConsumerController<ToolTypeBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(ToolTypeAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.CLIMATIC_ENVIRONMENTAL)
  //   handleNewClimanticEnvironmetal(
  //     @Payload() message: MessageConsumerController<ClimaticEnvironmentalBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new CreateEntityCommand(ClimaticEnvironmentalAct, payload),
  //     );
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.CLIMATIC_ENVIRONMENTAL)
  //   handleUpdateClimanticEnvironmetal(
  //     @Payload() message: MessageConsumerController<ClimaticEnvironmentalBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(ClimaticEnvironmentalAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.PLANNING)
  //   handleNewPlanning(
  //     @Payload() message: MessageConsumerController<PlanningBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(new CreateEntityCommand(PlanningAct, payload));
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.PLANNING)
  //   handleUpdatePlanning(
  //     @Payload() message: MessageConsumerController<PlanningBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(PlanningAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.NORMATIVE_DOCUMENT)
  //   handleNewNormativeDocument(
  //     @Payload() message: MessageConsumerController<NormativeDocumentBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new CreateEntityCommand(NormativeDocumentAct, payload),
  //     );
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.NORMATIVE_DOCUMENT)
  //   handleUpdateNormativeDocument(
  //     @Payload() message: MessageConsumerController<NormativeDocumentBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(NormativeDocumentAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.SAMPLE_TYPE)
  //   handleNewSampleType(
  //     @Payload() message: MessageConsumerController<SampleTypeBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(new CreateEntityCommand(SampleTypeAct, payload));
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.SAMPLE_TYPE)
  //   handleUpdateSampleType(
  //     @Payload() message: MessageConsumerController<SampleTypeBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(SampleTypeAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.SAMPLE)
  //   handleNewSample(
  //     @Payload() message: MessageConsumerController<SampleBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(new CreateEntityCommand(SampleAct, payload));
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.SAMPLE)
  //   handleUpdateSample(
  //     @Payload() message: MessageConsumerController<SampleBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(SampleAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.PREPARATION)
  //   handleNewPreparation(
  //     @Payload() message: MessageConsumerController<PreparationBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(new CreateEntityCommand(PreparationAct, payload));
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.PREPARATION)
  //   handleUpdatePreparation(
  //     @Payload() message: MessageConsumerController<PreparationBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(PreparationAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.GOAL)
  //   handleNewGoal(@Payload() message: MessageConsumerController<GoalBase>): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(new CreateEntityCommand(GoalAct, payload));
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.GOAL)
  //   handleUpdateGoal(
  //     @Payload() message: MessageConsumerController<GoalBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(GoalAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.DEFINED_INDICATORS)
  //   handleNewDefinedIndicator(
  //     @Payload() message: MessageConsumerController<DefinedIndicatorBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new CreateEntityCommand(DefinedIndicatorAct, payload),
  //     );
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.DEFINED_INDICATORS)
  //   handleUpdateDefinedIndicator(
  //     @Payload() message: MessageConsumerController<DefinedIndicator>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(DefinedIndicatorAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.ADDITIONS)
  //   handleNewAddition(
  //     @Payload() message: MessageConsumerController<AdditionBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(new CreateEntityCommand(AdditionAct, payload));
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.ADDITIONS)
  //   handleUpdateAddition(
  //     @Payload() message: MessageConsumerController<AdditionBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(AdditionAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.INFORMATION_ABOUT_SELECTION)
  //   handleNewInformationAboutSelection(
  //     @Payload()
  //     message: MessageConsumerController<InformationAboutSelectionBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new CreateEntityCommand(InformationAboutSelectionAct, payload),
  //     );
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.INFORMATION_ABOUT_SELECTION)
  //   handleUpdateInformationAboutSelection(
  //     @Payload()
  //     message: MessageConsumerController<InformationAboutSelectionBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(
  //         InformationAboutSelectionAct,
  //         payload,
  //         payload.id,
  //       ),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.ENVIRONMENTAL_ENGINEER)
  //   handleNewEnvironmentalEngineer(
  //     @Payload() message: MessageConsumerController<EnvironmentalEngineerBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new CreateEntityCommand(EnvironmentalEngineerAct, payload),
  //     );
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.ENVIRONMENTAL_ENGINEER)
  //   handleUpdateEnvironmentalEngineer(
  //     @Payload() message: MessageConsumerController<EnvironmentalEngineerBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(EnvironmentalEngineerAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.REPRESENTATIVE)
  //   handleNewRepresentative(
  //     @Payload() message: MessageConsumerController<RepresentativeBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new CreateEntityCommand(RepresentativeAct, payload),
  //     );
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.REPRESENTATIVE)
  //   handleUpdateRepresentative(
  //     @Payload() message: MessageConsumerController<RepresentativeBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(RepresentativeAct, payload, payload.id),
  //     );
  //   }

  //   @createConsumerEventPattern(CONSUMERS.PASSED_SAMPLE)
  //   handleNewPassedSample(
  //     @Payload() message: MessageConsumerController<PassedSampleBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(new CreateEntityCommand(PassedSampleAct, payload));
  //   }

  //   @updateConsumerEventPattern(CONSUMERS.PASSED_SAMPLE)
  //   handleUdatePassedSample(
  //     @Payload() message: MessageConsumerController<PassedSampleBase>,
  //   ): void {
  //     const {
  //       value: { payload },
  //     } = message;

  //     this.commandBus.execute(
  //       new UpdateEntityCommand(PassedSampleAct, payload, payload.id),
  //     );
  //   }
}
