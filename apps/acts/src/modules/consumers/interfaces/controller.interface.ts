import { MessageConsumerController } from './message.interface';

type func = (message: MessageConsumerController<any>) => void;

export interface ConsumerController {
  handleNewCustomer: func;
  handleNewGeneralCustomer: func;
  handleNewLab: func;
  handleNewTypeOfSample: func;
  handleNewObjectName: func;
  handleNewPlace: func;
  handleNewMethod: func;
  handleNewToolType: func;
  handleNewClimanticEnvironmetal: func;
  handleNewPlanning: func;
  handleNewNormativeDocument: func;
  handleNewSampleType: func;
  handleNewSample: func;
  handleNewPreparation: func;
  handleNewGoal: func;
  handleNewDefinedIndicator: func;
  handleNewAddition: func;
  handleNewInformationAboutSelection: func;
  handleNewEnvironmentalEngineer: func;
  handleNewRepresentative: func;
  handleNewPassedSample: func;
}
