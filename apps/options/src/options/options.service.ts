import { EntitiesService } from '@app/commands';
import {
  Act,
  DefinedIndicatorRelations,
  Lab,
  NewDefinedIndicator,
  NewOption,
  Option,
  PatchOption,
  TryCatchWrapperAsync,
  TypeOfSample,
} from '@app/models';
import { PatchDefinedIndicator } from '@app/models/models/options/dto/patch-defined-indicator.dto';
import { AbstractDataService } from '@app/resolvers/base-resolver/abstract-data.service';
import { Injectable, Type } from '@nestjs/common';
import { raw } from 'express';

@Injectable()
export class OptionsService extends AbstractDataService {
  constructor(private readonly entities: EntitiesService) {
    super();
  }

  @TryCatchWrapperAsync()
  async newData(
    data: NewDefinedIndicator | NewOption,
  ): Promise<DefinedIndicatorRelations | Option> {
    if (data['lab']) {
      const newData = data as NewDefinedIndicator;

      const consumers = await this.getConsumers(newData);

      const updatedData: DefinedIndicatorRelations = {
        ...consumers,
        label: newData.label,
      };

      return updatedData;
    } else {
      const newData = data as NewOption;

      return newData;
    }
  }

  @TryCatchWrapperAsync()
  async updateData(
    data: PatchOption | PatchDefinedIndicator,
  ): Promise<DefinedIndicatorRelations | PatchOption> {
    return data;
  }

  @TryCatchWrapperAsync()
  async createDistinctForOption<T>(
    classRef: Type<T>,
    field: string,
  ): Promise<T[]> {
    const repository = this.entities.getRepository(Act);

    const raw = await repository
      .createQueryBuilder('act')
      .select(`act.${field}`, 'label')
      .distinct()
      .orderBy(`act.${field}`)
      .getRawMany();

    return raw.filter(r => r.label);
  }

  @TryCatchWrapperAsync()
  async populateWhere(data: PatchDefinedIndicator | any) {
    const where = await this.getConsumers(data);
    return where;
  }

  @TryCatchWrapperAsync()
  async getConsumers(
    data: NewDefinedIndicator,
  ): Promise<{ lab: Lab; typeOfSample: TypeOfSample }> {
    const lab = await this.entities.findEntityByIdWithException(Lab, data.lab);

    const typeOfSample = await this.entities.findEntityByIdWithException(
      TypeOfSample,
      data.typeOfSample,
    );

    return {
      lab,
      typeOfSample,
    };
  }
}
