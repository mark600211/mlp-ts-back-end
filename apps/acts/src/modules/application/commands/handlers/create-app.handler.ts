import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAppCommand } from '../impl/create-app.command';
import { Logger } from '@nestjs/common';
import { ApplicationService } from '../../application.service';
import { Application } from '@app/models';

@CommandHandler(CreateAppCommand)
export class CreateAppHandler implements ICommandHandler<CreateAppCommand> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly appService: ApplicationService) {}

  async execute(command: CreateAppCommand): Promise<Application> {
    this.logger.verbose('create-app.handler');

    const { data } = command;

    try {
      return this.appService.createApplication(data);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
