import { EntitiesService } from '@app/commands';
import { Act, NewAppDto, PatchAppDto, Place } from '@app/models';
import { AbstractDataService } from '@app/resolvers/base-resolver/abstract-data.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationService extends AbstractDataService {
  constructor(private entities: EntitiesService) {
    super();
  }

  async newData(data: NewAppDto): Promise<any> {
    let place;
    let datetime;
    if (data?.place) {
      place = await this.entities.findEntityByIdWithException(
        Place,
        data.place,
      );
    }
    if (data?.datetime) {
      datetime = data.datetime;
    }

    return { place, datetime };
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
