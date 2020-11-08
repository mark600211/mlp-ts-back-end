import { CreateConsumerDto, PatchConsumerDto } from '@app/models';
import { AbstractDataService } from '@app/resolvers/base-resolver/abstract-data.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsumersService extends AbstractDataService {
  constructor() {
    super();
  }

  async newData(data: CreateConsumerDto): Promise<CreateConsumerDto> {
    return data;
  }

  async updateData(data: PatchConsumerDto): Promise<PatchConsumerDto> {
    return data;
  }
}
