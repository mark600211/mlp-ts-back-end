import { NewActDto } from '@app/models';

export class NewActCommand {
  constructor(public readonly newActData: NewActDto) {}
}
