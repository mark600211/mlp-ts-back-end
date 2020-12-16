import { PatchAppDto } from '@app/models';
import { AbstractDataService } from '@app/resolvers/base-resolver/abstract-data.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationService extends AbstractDataService {
  async newData(data: any): Promise<any> {
    return data;
  }

  async updateData(data: PatchAppDto): Promise<PatchAppDto> {
    return data;
  }

  async populateWhere(data: any): Promise<any> {
    return data;
  }

  async createDistinctForOption(data: any): Promise<any> {
    return data;
  }
}
