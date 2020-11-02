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
import { Injectable } from '@nestjs/common';
import { AllConsumersNew, AllConsumersPatch } from '../../interfaces';
import { ConsumersService } from '../consumers/consumers.service';

@Injectable()
export class ActsService {
  constructor(
    private readonly dbService: DbService,
    private readonly consumerService: ConsumersService,
  ) {}

  @TryCatchWrapper()
  newActData(data: NewActDto): ActBase {
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
  updateActData(data: PatchActDto): ActBase {
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
    const act = await this.dbService.findEntityByIdWithException(Act, id);

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

    await this.dbService.updateEntityById(Act, act, id);
  }
}
