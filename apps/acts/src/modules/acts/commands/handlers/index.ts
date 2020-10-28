import { NewActHandler } from './new-act.handler';
import { UpdateActHandler } from './update-act.handler';
import { CreateAppHandler } from './app-create.handler';
import { DeleteAppHandler } from './app-delete.handler';
import { CreateAppCopyHandler } from './app-copy.handler';
import { ChangeStatusHandler } from './change-status.handler';

export const CommandHadlers = [
  NewActHandler,
  UpdateActHandler,
  CreateAppHandler,
  DeleteAppHandler,
  CreateAppCopyHandler,
  ChangeStatusHandler,
];
