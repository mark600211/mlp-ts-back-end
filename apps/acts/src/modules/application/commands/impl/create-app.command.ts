import { PatchAppDto } from '@app/models';

export class CreateAppCommand {
  constructor(public readonly data: PatchAppDto) {}
}
