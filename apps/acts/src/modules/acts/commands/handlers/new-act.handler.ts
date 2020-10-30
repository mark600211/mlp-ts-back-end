/* eslint-disable prefer-const */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NewActCommand } from '../impl/new-act.command';
import { Logger } from '@nestjs/common';
import { ActsService } from '../../acts.service';
import { Act } from '@app/models';

@CommandHandler(NewActCommand)
export class NewActHandler implements ICommandHandler<NewActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly as: ActsService) {}

  async execute(command: NewActCommand): Promise<Act> {
    this.logger.verbose(`new-act.command`);

    const { newActData } = command;

    try {
      const newAct = this.as.newAct(newActData);

      return newAct;
    } catch (e) {
      this.logger.error(JSON.stringify(e));
    }
  }
}
