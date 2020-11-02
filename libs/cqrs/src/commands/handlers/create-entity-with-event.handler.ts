import { EntityCreatedEvent } from '@app/cqrs/events';
import { EventDto, TryCatchWrapperAsync } from '@app/models';
import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CreateEntityCommand, CreateEntityWithEventCommand } from '../impl';

@CommandHandler(CreateEntityWithEventCommand)
export class CreateEntityWithEventHander
  implements ICommandHandler<CreateEntityWithEventCommand<any, any, any>> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
  ) {}

  @TryCatchWrapperAsync()
  async execute<T extends U, U, F extends EventDto>(
    command: CreateEntityWithEventCommand<T, U, F>,
  ): Promise<T> {
    const { entity, data, eventEntity } = command;

    const newEntity = await this.commandBus.execute(
      new CreateEntityCommand(entity, data),
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
