/* eslint-disable prefer-const */
import { DbService } from '@app/db';
import {
  Act,
  AdditionAct,
  Application,
  ApplicationBase,
  ClimaticEnvironmentalAct,
  ConsumerNotFound,
  CustomerAct,
  DefinedIndicatorAct,
  EnvironmentalEngineerAct,
  GeneralCustomerAct,
  GoalAct,
  InformationAboutSelectionAct,
  LabAct,
  MethodAct,
  NewActDto,
  NormativeDocumentAct,
  ObjectNameAct,
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
import { Injectable, Logger } from '@nestjs/common';
import { EntityTarget, Repository } from 'typeorm';
import { AllConsumers } from '../../models/all-consumers.model';
import { Lab } from '../labs/models/lab.model';

@Injectable()
export class ConsumersService {
  logger = new Logger(this.constructor.name);

  constructor(private readonly dbService: DbService) {}

  getRepository(
    key: string,
  ): Repository<
    | CustomerAct
    | GeneralCustomerAct
    | LabAct
    | TypeOfSampleAct
    | ObjectNameAct
    | PlaceAct
    | MethodAct
    | ToolTypeAct
    | ClimaticEnvironmentalAct
    | PlanningAct
    | NormativeDocumentAct
    | SampleTypeAct
    | SampleAct
    | PreparationAct
    | GoalAct
    | DefinedIndicatorAct
    | AdditionAct
    | InformationAboutSelectionAct
    | EnvironmentalEngineerAct
    | RepresentativeAct
    | PassedSampleAct
    | Application
  > {
    let repository: Repository<any>;

    switch (key) {
      case 'customer':
        repository = this.dbService.getRepository<CustomerAct>(CustomerAct);
        break;
      case 'generalCustomer':
        repository = this.dbService.getRepository<GeneralCustomerAct>(
          GeneralCustomerAct,
        );
        break;
      case 'lab':
        repository = this.dbService.getRepository<Lab>(Lab);
        break;
      case 'typeOfSample':
        repository = this.dbService.getRepository<TypeOfSampleAct>(
          TypeOfSampleAct,
        );
        break;
      case 'objectName':
        repository = this.dbService.getRepository<ObjectNameAct>(ObjectNameAct);
        break;
      case 'place':
        repository = this.dbService.getRepository<PlaceAct>(PlaceAct);
        break;
      case 'method':
        repository = this.dbService.getRepository<MethodAct>(MethodAct);
        break;
      case 'toolType':
        repository = this.dbService.getRepository<ToolTypeAct>(ToolTypeAct);
        break;
      case 'climaticEnvironmental':
        repository = this.dbService.getRepository<ClimaticEnvironmentalAct>(
          ClimaticEnvironmentalAct,
        );
        break;
      case 'planning':
        repository = this.dbService.getRepository<PlanningAct>(PlanningAct);
        break;
      case 'normativeDocument':
        repository = this.dbService.getRepository<NormativeDocumentAct>(
          NormativeDocumentAct,
        );
        break;
      case 'sampleType':
        repository = this.dbService.getRepository<SampleTypeAct>(SampleTypeAct);
        break;
      case 'sample':
        repository = this.dbService.getRepository<SampleAct>(SampleAct);
        break;
      case 'preparation':
        repository = this.dbService.getRepository<PreparationAct>(
          PreparationAct,
        );
        break;
      case 'goal':
        repository = this.dbService.getRepository<GoalAct>(GoalAct);
        break;
      case 'definedIndicators':
        repository = this.dbService.getRepository<DefinedIndicatorAct>(
          DefinedIndicatorAct,
        );
        break;
      case 'additions':
        repository = this.dbService.getRepository<AdditionAct>(AdditionAct);
        break;
      case 'informationAboutSelection':
        repository = this.dbService.getRepository<InformationAboutSelectionAct>(
          InformationAboutSelectionAct,
        );
        break;
      case 'environmentalEngineer':
        repository = this.dbService.getRepository<EnvironmentalEngineerAct>(
          EnvironmentalEngineerAct,
        );
        break;
      case 'representative':
        repository = this.dbService.getRepository<RepresentativeAct>(
          RepresentativeAct,
        );
        break;
      case 'passedSample':
        repository = this.dbService.getRepository<PassedSampleAct>(
          PassedSampleAct,
        );
        break;
      case 'application':
        repository = this.dbService.getRepository<Application>(Application);
      default:
        break;
    }

    return repository;
  }

  getConsumerWithException<T>(id: string, entity: EntityTarget<T>): Promise<T> {
    const repository: Repository<T> = this.dbService.getRepository(entity);

    const consumer = this.findConsumerWithExceptions(repository, id);

    return consumer;
  }

  async findConsumerWithExceptions<T>(
    repository: Repository<T>,
    id: string,
  ): Promise<T> {
    const consumer = await repository.findOne(id);

    if (!consumer) throw new ConsumerNotFound(typeof consumer);

    return consumer;
  }

  findAllConsumers(data: NewActDto): AllConsumers {
    let allConsumers: AllConsumers;

    const keys = Object.keys(data);

    keys.forEach(async key => {
      if (data[key] && !Array.isArray(data[key])) {
        const repositroy = this.getRepository(key);

        if (!repositroy) return;

        const consumer = await this.findConsumerWithExceptions(
          repositroy,
          data[key],
        );

        allConsumers[key] = consumer;
      }

      if (Array.isArray(data[key]) && data[key].length >= 1) {
        let consumerFoundArr: any[] = [];

        const consumerArr: any[] = data[key];

        const repository = this.getRepository(key);

        if (!repository) return;

        if (consumerArr[0] instanceof ApplicationBase) {
          consumerArr.forEach(async (app: ApplicationBase) => {
            const consumer = await (repository as Repository<
              Application
            >).update(app.id, { ...app });

            consumerFoundArr.push(consumer);
          });
        } else {
          consumerArr.forEach(async id => {
            const consumer = await this.findConsumerWithExceptions(
              repository,
              id,
            );

            consumerFoundArr.push(consumer);
          });
        }

        allConsumers[key] = consumerFoundArr;
      }
    });

    return allConsumers;
  }
}
