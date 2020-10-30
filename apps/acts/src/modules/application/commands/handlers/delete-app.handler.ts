import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAppCommand } from '../impl/delete-app.command';
import { Logger } from '@nestjs/common';
import { ApplicationService } from '../../application.service';

@CommandHandler(DeleteAppCommand)
export class DeleteAppHandler implements ICommandHandler<DeleteAppCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly appService: ApplicationService) {}

  async execute(command: DeleteAppCommand): Promise<void> {
    this.logger.verbose('delte-app-handler');

    const { id } = command;

    try {
      this.appService.deleteApplication(id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
