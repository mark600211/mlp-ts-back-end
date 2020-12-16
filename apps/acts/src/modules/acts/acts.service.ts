import {
  Act,
  ActBase,
  ActStatus,
  Customer,
  DocType,
  GeneralCustomer,
  Lab,
  NewActDto,
  PatchActDto,
  TryCatchWrapper,
  TryCatchWrapperAsync,
  TypeOfSample,
} from '@app/models';
import { AbstractDataService } from '@app/resolvers/base-resolver/abstract-data.service';
import { Injectable, Logger } from '@nestjs/common';
import { EntitiesService } from 'libs/commands/src';
import { AllConsumersNew, AllConsumersPatch } from '../../interfaces';
import { ConsumersService } from '../consumers/consumers.service';
import { TableConditions } from './models/table-conditions.dto';
import { TableContent } from './models/table-content.model';

@Injectable()
export class ActsService extends AbstractDataService {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly consumerService: ConsumersService,
    private readonly entities: EntitiesService,
  ) {
    super();
  }

  @TryCatchWrapperAsync()
  async newData(data: NewActDto): Promise<any> {
    const consumers = await this.consumerService.findAllConsumers<
      AllConsumersNew
    >(data);

    const act = {
      ...data,
      ...consumers,
    };

    return act;
  }

  @TryCatchWrapper()
  findActByIdWithRelations(
    id: string,
    relations: Array<keyof Act & string>,
  ): Promise<any> {
    return this.entities.findEntityByIdWithException(Act, id, relations);
  }

  @TryCatchWrapper()
  async updateData(data: PatchActDto): Promise<any> {
    const consumers = this.consumerService.findAllConsumers<AllConsumersPatch>(
      data,
    );

    const updateData = {
      ...consumers,
      name: data.name,
      datetime: data.datetime,
    };

    return updateData;
  }

  async populateWhere(data: any): Promise<any> {
    return data;
  }

  async createDistinctForOption(data: any): Promise<any> {
    return data;
  }

  async findAllDistinct(data: any): Promise<any> {
    return data;
  }

  @TryCatchWrapperAsync()
  async changeActStatus(id: string, status: DocType): Promise<void> {
    const act = await this.entities.findEntityByIdWithException(Act, id);

    switch (status) {
      case DocType.ACT:
        if (
          act.status !== ActStatus.REGISTERED &&
          act.status !== ActStatus.PROTOCOL &&
          ActStatus.FULL
        ) {
          act.status = ActStatus.CREATED;
        }
        break;
      case DocType.ACT_PDF:
        if (
          act.status !== ActStatus.PROTOCOL &&
          act.status !== ActStatus.FULL
        ) {
          act.status = ActStatus.REGISTERED;
        }
      case DocType.PROTOCOL:
        if (act.status !== ActStatus.PROTOCOL) {
          act.status = ActStatus.PROTOCOL;
        }
        break;
      case DocType.FINAL_PROTOCOL:
        act.status = ActStatus.FULL;
        break;
    }

    await this.entities.updateEntityById(Act, act, id);
  }

  @TryCatchWrapperAsync()
  async getTableContent(
    tableConditions: TableConditions,
  ): Promise<TableContent> {
    this.logger.log(tableConditions);

    const qb = this.entities.getRepository(Act).createQueryBuilder('act');

    const subCustomer = this.entities
      .getRepository(Customer)
      .createQueryBuilder('customer')
      .select('id');

    const customerIds = tableConditions.wheres?.find(
      where => where.relation === 'customer',
    )?.ids;

    if (tableConditions.wheres && customerIds?.length >= 1) {
      subCustomer.where('id IN (:...customerIds)', {
        customerIds: [...customerIds],
      });
    }

    const subGeneralCustomer = this.entities
      .getRepository(GeneralCustomer)
      .createQueryBuilder('generalCustomer')
      .select('id');

    const generalCustomerIds = tableConditions.wheres?.find(
      where => where.relation === 'generalCustomer',
    )?.ids;

    if (tableConditions.wheres && generalCustomerIds?.length >= 1) {
      this.logger.log('g');
      subGeneralCustomer.where('id IN (:...gCustomerIds)', {
        gCustomerIds: [...generalCustomerIds],
      });

      this.logger.log(await subGeneralCustomer.getRawMany());
    }

    const subLab = this.entities
      .getRepository(Lab)
      .createQueryBuilder('lab')
      .select('id');

    const labIds = tableConditions.wheres?.find(
      where => where.relation === 'lab',
    )?.ids;

    if (tableConditions.wheres && labIds?.length >= 1) {
      subLab.where('id IN (:...labIds)', { labIds: [...labIds] });
    }

    const subTypeOfSample = this.entities
      .getRepository(TypeOfSample)
      .createQueryBuilder('typeOfSample')
      .select('id');

    const tosIds = tableConditions.wheres?.find(
      where => where.relation === 'typeOfSample',
    )?.ids;

    if (tableConditions.wheres && tosIds?.length >= 1) {
      subTypeOfSample.where('id IN (:...tosIds)', { tosIds: [...tosIds] });
    }

    let dataQb = qb;

    if (tableConditions.dateRangeStart && tableConditions.dateRangeEnd) {
      dataQb = qb
        .where('act.datetime.date >= :startTime', {
          startTime: tableConditions.dateRangeStart,
        })
        .andWhere('act.datetime.date <= :endTime', {
          endTime: tableConditions.dateRangeEnd,
        });
    }

    const inneredQb = dataQb
      .innerJoin(
        'act.customer',
        'customer',
        'customer.id IN (' + subCustomer.getQuery() + ')',
      )
      .setParameters(subCustomer.getParameters())
      .innerJoin(
        'act.generalCustomer',
        'generalCustomer',
        'generalCustomer.id IN (' + subGeneralCustomer.getQuery() + ')',
      )
      .setParameters(subGeneralCustomer.getParameters())
      .innerJoin('act.lab', 'lab', 'lab.id IN (' + subLab.getQuery() + ')')
      .setParameters(subLab.getParameters())
      .innerJoin(
        'act.typeOfSample',
        'typeOfSample',
        'typeOfSample.id IN (' + subTypeOfSample.getQuery() + ')',
      )
      .setParameters(subTypeOfSample.getParameters())
      .addSelect([
        'customer.id',
        'customer.label',
        'generalCustomer.id',
        'generalCustomer.label',
        'lab.id',
        'lab.label',
        'typeOfSample.id',
        'typeOfSample.label',
      ]);

    const totalCount = await inneredQb.getCount();

    const subUniq = inneredQb;

    const acts = await inneredQb
      .orderBy(
        tableConditions.sort ? tableConditions.sort : 'act.createdAt',
        tableConditions.sortDirection ? tableConditions.sortDirection : 'DESC',
      )
      .skip(tableConditions.skip)
      .take(tableConditions.take)
      .getMany();

    const uniqCustomers = await subUniq
      .select('customer.id', 'id')
      .orderBy()
      .distinct()
      .getRawMany();

    const uniqGeneralCustomers = await subUniq
      .select('generalCustomer.id', 'id')
      .distinct()
      .getRawMany();

    const uniqLabs = await subUniq
      .select('lab.id', 'id')
      .distinct()
      .getRawMany();

    const uniqTypeOfSamples = await subUniq
      .select('typeOfSample.id', 'id')
      .distinct()
      .getRawMany();

    const tableContent: TableContent = {
      uniqCustomers: uniqCustomers.map(val => val.id),
      uniqGeneralCustomers: uniqGeneralCustomers.map(val => val.id),
      uniqTypeOfSamples: uniqTypeOfSamples.map(val => val.id),
      uniqLabs: uniqLabs.map(val => val.id),
      nodes: acts,
      totalCount,
    };

    this.logger.log(acts);

    return tableContent;
  }
}
