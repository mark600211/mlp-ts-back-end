import { DbService } from '@app/db';
import {
  Act,
  ActBase,
  ActStatus,
  DocType,
  NewActDto,
  PatchActDto,
  TryCatchWrapper,
  TryCatchWrapperAsync,
} from '@app/models';
import { AbstractDataService } from '@app/resolvers/base-resolver/abstract-data.service';
import { Injectable } from '@nestjs/common';
import { EntitiesService } from 'libs/commands/src';
import { AllConsumersNew, AllConsumersPatch } from '../../interfaces';
import { ConsumersService } from '../consumers/consumers.service';

@Injectable()
export class ActsService extends AbstractDataService {
  constructor(
    private readonly consumerService: ConsumersService,
    private readonly entities: EntitiesService,
  ) {
    super();
  }

  @TryCatchWrapper()
  async newData(data: NewActDto): Promise<ActBase> {
    const consumers = this.consumerService.findAllConsumers<AllConsumersNew>(
      data,
    );

    const act: ActBase = {
      ...consumers,
      name: data.name,
      datetime: data.datetime,
    };

    return act;
  }

  @TryCatchWrapper()
  findActByIdWithRelations(id: string, relations: Array<keyof Act & string>): Promise<Act> {
    return this.entities.findEntityByIdWithException(Act, id, relations)
  }

  @TryCatchWrapper()
  async updateData(data: PatchActDto): Promise<ActBase> {
    const consumers = this.consumerService.findAllConsumers<AllConsumersPatch>(
      data,
    );

    const updateData: ActBase = {
      ...consumers,
      name: data.name,
      datetime: data.datetime,
    };

    return updateData;
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
}
