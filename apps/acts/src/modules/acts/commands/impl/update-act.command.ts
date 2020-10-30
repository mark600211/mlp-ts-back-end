import { PatchActDto } from '@app/models';

export class UpdateActCommand {
  constructor(public readonly data: PatchActDto) {}
}
