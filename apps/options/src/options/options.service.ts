import { EntitiesService } from '@app/commands';
import {
  DefinedIndicatorRelations,
  LabId,
  NewDefinedIndicator,
  Option,
  PatchOption,
  TryCatchWrapperAsync,
  TypeOfSample,
} from '@app/models';
import { PatchDefinedIndicator } from '@app/models/models/options/dto/patch-defined-indicator.dto';
import { AbstractDataService } from '@app/resolvers/base-resolver/abstract-data.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OptionsService extends AbstractDataService {
  constructor(private readonly entities: EntitiesService) {
    super();
  }

  @TryCatchWrapperAsync()
  async newData(
    data: NewDefinedIndicator | string,
  ): Promise<DefinedIndicatorRelations | Option> {
    if (typeof data === typeof NewDefinedIndicator) {
      const newData = data as NewDefinedIndicator;

      const consumers = await this.getConsumers(newData);

      const updatedData: DefinedIndicatorRelations = {
        ...consumers,
        lable: newData.lable,
      };

      return updatedData;
    } else {
      const newData = data as string;

      return { lable: newData };
    }
  }

  @TryCatchWrapperAsync()
  async updateData(
    data: PatchOption | PatchDefinedIndicator,
  ): Promise<DefinedIndicatorRelations | PatchOption> {
    if (typeof data === typeof PatchDefinedIndicator) {
      const newData = data as PatchDefinedIndicator;

      const consumers = await this.getConsumers(newData);

      const updateData: DefinedIndicatorRelations = {
        ...consumers,
        lable: newData.lable,
      };

      return updateData;
    } else {
      return data as PatchOption;
    }
  }

  @TryCatchWrapperAsync()
  async getConsumers(
    data: PatchDefinedIndicator | NewDefinedIndicator,
  ): Promise<{ lab: LabId; typeOfSample: TypeOfSample }> {
    const lab = await this.entities.findEntityByIdWithException(
      LabId,
      data.lab,
    );

    const typeOfSample = await this.entities.findEntityByIdWithException(
      TypeOfSample,
      data.tos,
    );

    return {
      lab,
      typeOfSample,
    };
  }
}
