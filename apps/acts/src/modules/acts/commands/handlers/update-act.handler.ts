import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateActCommand } from '../impl/update-act.command';
import { Logger } from '@nestjs/common';
import { ActsService } from '../../acts.service';
import { Act } from '@app/models';

@CommandHandler(UpdateActCommand)
export class UpdateActHandler implements ICommandHandler<UpdateActCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly as: ActsService) {}

  async execute(command: UpdateActCommand): Promise<Act> {
    this.logger.verbose('update-act.handler');

    const { data } = command;

    try {
      return this.as.updateAct(data);
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
