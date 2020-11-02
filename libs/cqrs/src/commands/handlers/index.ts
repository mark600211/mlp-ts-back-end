import { CreateEntityWithEventHander } from './create-entity-with-event.handler';
import { NewOptionHandler } from './create-entity.handler';
import { DeleteEntityHandler } from './delete-entity.handler';
import { UpdateEntityWithEventHander } from './update-entity-with-event.handler';
import { UpdateOptionHandler } from './update-entity.handler';

export const CommandHandlers = [
  NewOptionHandler,
  UpdateOptionHandler,
  DeleteEntityHandler,
  CreateEntityWithEventHander,
  UpdateEntityWithEventHander,
];
