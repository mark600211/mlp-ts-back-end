import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllApplicationsQuery } from '../impl/get-all-applications.query';
import { Logger } from '@nestjs/common';
import { Application } from '@app/models';
import { ApplicationService } from '../../application.service';

@QueryHandler(GetAllApplicationsQuery)
export class GetAllApplicationHandler
  implements IQueryHandler<GetAllApplicationsQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly appService: ApplicationService) {}

  async execute(): Promise<Application[]> {
    this.logger.verbose('get-all-application.handler');

    try {
      return await this.appService.findApplications();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
