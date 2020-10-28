import { CreateAppCopyCommand } from '../impl/create-app-copy.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ActsService } from '../../acts.service';
import { Application } from '@app/models';

@CommandHandler(CreateAppCopyCommand)
export class CreateAppCopyHandler
  implements ICommandHandler<CreateAppCopyCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly actService: ActsService) {}

  async execute(command: CreateAppCopyCommand): Promise<Application> {
    this.logger.verbose('create-copy-handler');

    try {
      const { copyAppData } = command;

      return await this.appRepositroy.save({ ...copyAppData });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
