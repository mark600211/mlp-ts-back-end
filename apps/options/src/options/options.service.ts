import { GetEntityQuery } from '@app/cqrs';
import { DbService } from '@app/db';
import {
  DefinedIndicatorRelations,
  LabId,
  NewDefinedIndicator,
  TryCatchWrapperAsync,
  TypeOfSample,
} from '@app/models';
import { PatchDefinedIndicator } from '@app/models/models/options/dto/patch-defined-indicator.dto';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class OptionsService {
  constructor(private readonly queryBus: QueryBus) {}

  @TryCatchWrapperAsync()
  async getConsumers(
    data: PatchDefinedIndicator | NewDefinedIndicator,
  ): Promise<{ lab: LabId; typeOfSample: TypeOfSample }> {
    const lab = await this.queryBus.execute(
      new GetEntityQuery(LabId, data.lab),
    );

    const typeOfSample = await this.queryBus.execute(
      new GetEntityQuery(TypeOfSample, data.tos),
    );

    return {
      lab,
      typeOfSample,
    };
  }
}
