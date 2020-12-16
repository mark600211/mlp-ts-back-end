import { DbService } from '@app/db';
import {
  CreateConsumerDto,
  PatchConsumerDto,
  TryCatchWrapperAsync,
} from '@app/models';
import { AbstractDataService } from '@app/resolvers/base-resolver/abstract-data.service';
import { Injectable, Type } from '@nestjs/common';

@Injectable()
export class ConsumersService extends AbstractDataService {
  constructor(private entities: DbService) {
    super();
  }

  async newData(data: CreateConsumerDto): Promise<CreateConsumerDto> {
    return data;
  }

  async updateData(data: PatchConsumerDto): Promise<PatchConsumerDto> {
    return data;
  }

  async populateWhere(data: any): Promise<any> {
    return data;
  }

  async createDistinctForOption(data: any): Promise<any> {
    return data;
  }
}
