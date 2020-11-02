import { EntityCreatedEvent } from '@app/cqrs/events';
import { EventDto, TryCatchWrapperAsync } from '@app/models';
import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
} from '@nestjs/cqrs';
import { UpdateEntityCommand, UpdateEntityWithEventCommand } from '../impl';

@CommandHandler(UpdateEntityWithEventCommand)
export class UpdateEntityWithEventHander
  implements ICommandHandler<UpdateEntityWithEventCommand<any, any, any>> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
  ) {}

  @TryCatchWrapperAsync()
  async execute<T extends U, U, F extends EventDto>(
    command: UpdateEntityWithEventCommand<T, U, F>,
  ): Promise<T> {
    const { entity, data, id, eventEntity } = command;

    const newEntity = await this.commandBus.execute(
      new UpdateEntityCommand(entity, data, id),
    );

    this.eventBus.publish(
      new EntityCreatedEvent(
        eventEntity,
        newEntity,
        newEntity.id,
        newEntity.id,
      ),
    );

    return newEntity;
  }
}
