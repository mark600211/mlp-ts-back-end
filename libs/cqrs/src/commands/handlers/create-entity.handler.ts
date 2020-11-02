import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CqrsService } from '../../cqrs.service';
import { CreateEntityCommand } from '../impl';

@CommandHandler(CreateEntityCommand)
export class NewOptionHandler
  implements ICommandHandler<CreateEntityCommand<any, any>> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly service: CqrsService) {}

  async execute<T extends U, U>(
    command: CreateEntityCommand<T, U>,
  ): Promise<T> {
    this.logger.verbose('new-option.handler');

    const { entity, data } = command;

    try {
      return this.service.createEntity<T, U>(entity, data);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
