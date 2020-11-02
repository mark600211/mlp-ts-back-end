import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CqrsService } from '../../cqrs.service';
import { UpdateEntityCommand } from '../impl';

@CommandHandler(UpdateEntityCommand)
export class UpdateOptionHandler
  implements ICommandHandler<UpdateEntityCommand<any, any>> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly service: CqrsService) {}

  async execute<T extends U, U>(
    command: UpdateEntityCommand<T, U>,
  ): Promise<T> {
    this.logger.verbose('updata-option.handler');

    const { entity, data, id } = command;

    try {
      return this.service.updateEntity(entity, data, id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
