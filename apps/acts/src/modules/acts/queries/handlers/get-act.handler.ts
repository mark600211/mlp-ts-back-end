import { Act } from '@app/models';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ActsService } from '../../acts.service';
import { GetActQuery } from '../impl';

@QueryHandler(GetActQuery)
export class GetActHandler implements IQueryHandler<GetActQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly actsService: ActsService) {}

  async execute(query: GetActQuery): Promise<Act> {
    this.logger.verbose('get-act.handler');

    const { id } = query;

    try {
      return this.actsService.findAct(id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
