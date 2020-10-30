import { Controller, Logger } from '@nestjs/common';
import { ActsService } from './acts.service';

export interface ChangeIdDto {
  newId: string;
  oldId: string;
}

@Controller('acts')
export class ActsController {
  logger = new Logger(this.constructor.name);

  constructor(private readonly actsServie: ActsService) {}
}
