import { EntitiesService } from '@app/commands';
import { CGCTemplateModel, PrintType, TryCatchWrapperAsync } from '@app/models';
import { AbstractDataService } from '@app/resolvers/base-resolver/abstract-data.service';
import { Injectable } from '@nestjs/common';
import { FindCGCTemplate } from './model';

@Injectable()
export class CGCService extends AbstractDataService {
  constructor(private readonly entities: EntitiesService) {
    super();
  }

  @TryCatchWrapperAsync()
  async newData(data: any): Promise<any> {
    return data;
  }

  @TryCatchWrapperAsync()
  async updateData(data: any): Promise<any> {
    return data;
  }

  @TryCatchWrapperAsync()
  async findOrCreateCGC(data: FindCGCTemplate): Promise<CGCTemplateModel> {
    let cgc = await this.entities.findOneWhere(CGCTemplateModel, data);

    if (!cgc) {
      const createData = {
        ...data,
        printedCustomer: PrintType.EMPTY,
        printedGeneralCustomer: PrintType.EMPTY,
      } as CGCTemplateModel;

      cgc = await this.entities.createEntity(CGCTemplateModel, createData);
    }

    return cgc;
  }
}
