/* eslint-disable @typescript-eslint/camelcase */
import { CreateEntityCommand } from '@app/cqrs/commands';
import { EventDto, TryCatchWrapperAsync } from '@app/models';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EntityCreatedEvent } from '../impl';

@EventsHandler(EntityCreatedEvent)
export class EntityCreatedHandler
  implements IEventHandler<EntityCreatedEvent<any, any>> {
  constructor(private commandBus: CommandBus) {}

  @TryCatchWrapperAsync()
  async handle<T extends EventDto, F>(
    event: EntityCreatedEvent<T, F>,
  ): Promise<void> {
    const { entity, payload, eventKey, aggregateId } = event;

    const data: EventDto = {
      payload,
      event_type: 'CREATED',
      event_key: eventKey,
      aggregateType: `${typeof entity}.CREATED`,
      aggregateid: aggregateId,
    };

    this.commandBus.execute(new CreateEntityCommand(entity, data));
  }
}
