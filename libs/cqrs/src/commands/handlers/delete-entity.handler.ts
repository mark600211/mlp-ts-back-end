import { CqrsService } from '@app/cqrs/cqrs.service';
import { TryCatchWrapperAsync } from '@app/models';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteEntityCommand } from '../impl';

@CommandHandler(DeleteEntityCommand)
export class DeleteEntityHandler
  implements ICommandHandler<DeleteEntityCommand<any>> {
  constructor(private readonly service: CqrsService) {}

  @TryCatchWrapperAsync()
  async execute<T>(command: DeleteEntityCommand<T>): Promise<void> {
    const { id, entity } = command;

    this.service.deleteEntityById(entity, id);
  }
}
