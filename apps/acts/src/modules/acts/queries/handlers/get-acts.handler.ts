import { Act } from '@app/models';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ActsService } from '../../acts.service';
import { GetActsQuery } from '../impl';

@QueryHandler(GetActsQuery)
export class GetActsHandler implements IQueryHandler<GetActsQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly actsService: ActsService) {}

  async execute(): Promise<Act[]> {
    this.logger.verbose('get-acts.handler');

    try {
      return this.actsService.findActs();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
