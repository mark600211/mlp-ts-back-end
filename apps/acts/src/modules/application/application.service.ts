import { DbService } from '@app/db';
import { Application, PatchAppDto } from '@app/models';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ApplicationService {
  logger = new Logger(this.constructor.name);

  constructor(private readonly dbService: DbService) {}

  findApplications(): Promise<Application[]> {
    this.logger.verbose('find-applications');

    try {
      const applications = this.dbService.findEntities(Application);

      return applications;
    } catch (error) {
      this.logger.error(error);
    }
  }

  createApplication(data: PatchAppDto): Promise<Application> {
    this.logger.verbose('create-application');

    try {
      const application = this.dbService.creatEntity(data, Application);

      return application;
    } catch (error) {
      this.logger.error(error);
    }
  }

  deleteApplication(id: string): void {
    this.logger.verbose('delete-application');

    try {
      this.dbService.deleteEntityById(Application, id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
