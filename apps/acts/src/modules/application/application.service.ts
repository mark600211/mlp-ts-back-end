import { AbstractDataService } from '@app/resolvers/base-resolver/abstract-data.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationService extends AbstractDataService {
  async newData(data: any): Promise<any> {
    return data;
  }

  async updateData(data: any): Promise<any> {
    return data;
  }
}
