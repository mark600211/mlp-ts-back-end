import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AbstractDataService {
  abstract async newData(...args: any): Promise<any>;
  abstract async updateData(...args: any): Promise<any>;
}
