/* eslint-disable @typescript-eslint/camelcase */
import { CreateEntityCommand } from '@app/cqrs/commands';
import { EventDto, TryCatchWrapperAsync } from '@app/models';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EntityUpdatedEvent } from '../impl';

@EventsHandler(EntityUpdatedEvent)
export class EntityUpdatedHandler
  implements IEventHandler<EntityUpdatedEvent<any, any>> {
  constructor(private commandBus: CommandBus) {}

  @TryCatchWrapperAsync()
  async handle<T extends EventDto, F>(
    event: EntityUpdatedEvent<T, F>,
  ): Promise<void> {
    const { entity, payload, eventKey, aggregateId } = event;

    const data: EventDto = {
      payload,
      event_type: 'UPDATED',
      event_key: eventKey,
      aggregateType: `${typeof entity}.UPDATED`,
      aggregateid: aggregateId,
    };

    this.commandBus.execute(new CreateEntityCommand(entity, data));
  }
}
