import { TryCatchWrapperAsync } from '@app/models';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CqrsService } from '../../cqrs.service';
import { GetEntitiesQuery } from '../impl';

@QueryHandler(GetEntitiesQuery)
export class GetEntitiesHandler
  implements IQueryHandler<GetEntitiesQuery<any>> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly service: CqrsService) {}

  @TryCatchWrapperAsync()
  async execute<T>(query: GetEntitiesQuery<T>): Promise<T[]> {
    const { entity } = query;

    return this.service.findEntities(entity);
  }
}
