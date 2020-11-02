import { TryCatchWrapperAsync } from '@app/models';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CqrsService } from '../../cqrs.service';
import { GetEntityQuery } from '../impl/get-entity.query';

@QueryHandler(GetEntityQuery)
export class GetEntityHandler implements IQueryHandler<GetEntityQuery<any>> {
  constructor(private readonly service: CqrsService) {}

  @TryCatchWrapperAsync()
  async execute<T>(query: GetEntityQuery<T>): Promise<T> {
    const { entity, id } = query;

    return this.service.findEntityByIdWithException(entity, id);
  }
}
