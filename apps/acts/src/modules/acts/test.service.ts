import { AbstractDataService } from '@app/resolvers/base-resolver/abstract-data.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TestService extends AbstractDataService {
  logger = new Logger(this.constructor.name);
  async newData(data: any): Promise<any> {
    this.logger.warn(data);
    return { test: data };
  }

  async updateData(data: any): Promise<any> {
    this.logger.warn(data);
    return { test: data };
  }
}
