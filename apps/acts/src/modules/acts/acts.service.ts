import { DbService } from '@app/db';
import {
  Act,
  ActBase,
  ActStatus,
  Doc,
  DocType,
  NewActDto,
  PatchActDto,
} from '@app/models';
import { Injectable, Logger } from '@nestjs/common';
import { AllConsumersNew, AllConsumersPatch } from '../../interfaces';
import { ConsumersService } from '../consumers/consumers.service';

@Injectable()
export class ActsService {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly dbService: DbService,
    private readonly consumerService: ConsumersService,
  ) {}

  newAct(data: NewActDto): Promise<Act> {
    const repository = this.dbService.getRepository<Act>(Act);

    const consumers = this.consumerService.findAllConsumers<AllConsumersNew>(
      data,
    );

    const newAct = repository.save({
      ...consumers,
      name: data.name,
      datetime: data.datetime,
    });

    return newAct;
  }

  findActs(): Promise<Act[]> {
    this.logger.verbose('find-acts');

    try {
      const acts = this.dbService.findEntities(Act);

      return acts;
    } catch (error) {
      this.logger.error(error);
    }
  }

  findAct(id: string): Promise<Act> {
    this.logger.log('find act');

    try {
      const act = this.dbService.findEntityByIdWithException<Act>(Act, id);

      return act;
    } catch (error) {
      this.logger.error(error);
    }
  }

  updateAct(data: PatchActDto): Promise<Act> {
    this.logger.verbose('update-act');

    try {
      const consumers = this.consumerService.findAllConsumers<
        AllConsumersPatch
      >(data);

      const updateData: ActBase = {
        ...consumers,
        id: data.id,
        name: data.name,
        datetime: data.datetime,
      };

      const newAct = this.dbService.updateEntityById(Act, updateData, data.id);

      return newAct;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async changeActStatus(id: string, status: DocType): Promise<void> {
    this.logger.verbose('change-status.method');

    try {
      const act = await this.findAct(id);

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
    } catch (error) {
      this.logger.error(error);
    }
  }
}
