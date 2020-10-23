import { Injectable, Logger } from '@nestjs/common';
import { Act } from './models/act.model';
import { ActRepository } from './repositories/act.repository';
import { Customer } from '../customers/models/customer.model';
import { GeneralCustomer } from '../general-customers/models/general-customer.model';
import { Lab } from '../labs/models/lab.model';
import { CustomersService } from '../customers/customers.service';
import { GeneralCustomersService } from '../general-customers/general-customers.service';
import { LabsService } from '../labs/labs.service';
import { Habitan } from '../type-of-sample/models/habitan.model';
import { TypeOfSampleService } from '../type-of-sample/type-of-sample.service';
import { TypeOfSample } from '../type-of-sample/models/type-of-sample.model';
import { HType } from '../type-of-sample/models/htype.model';

@Injectable()
export class ActsService {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly actRepository: ActRepository,
    private readonly customerService: CustomersService,
    private readonly generalCustomerService: GeneralCustomersService,
    private readonly labService: LabsService,
    private readonly tosService: TypeOfSampleService,
  ) {}

  newAct() {}

  findAct(id: string): Promise<Act> {
    return this.actRepository.findActById(id);
  }

  saveAct(act: Act): Promise<Act> {
    return this.actRepository.save(act);
  }

  async getCusomer(id: string): Promise<Customer> {
    this.logger.verbose('get-customer.method');
    try {
      return await this.customerService.findCustomerById(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getGeneralCustomer(id: string): Promise<GeneralCustomer> {
    this.logger.verbose('get-general-customer.method');
    try {
      return await this.generalCustomerService.findGeneralCustomerById(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getLab(id: string): Promise<Lab> {
    this.logger.verbose('get-lab.method');
    try {
      return await this.labService.findLabById(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getTOSByReletaions(
    habitanId: string,
    htypeId: string,
  ): Promise<{ tos: TypeOfSample; habitan: Habitan; htype: HType }> {
    this.logger.verbose('get-tos');

    try {
      return await this.tosService.findTOS(habitanId, htypeId);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getTOS(id: string): Promise<TypeOfSample> {
    this.logger.verbose('get-tos');

    try {
      return await this.tosService.findTOSById(id);
    } catch (error) {
      this.logger.error(`${error}: ${error.message}`);
    }
  }

  async getDocIds(actId: string): Promise<string[]> {
    this.logger.verbose('get-doc-ids');

    try {
      const docs = (
        await this.actRepository.findOne(actId, { relations: ['docs'] })
      ).docs;

      return docs.map(doc => doc.id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
