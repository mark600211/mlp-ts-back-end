import { Customer } from '..';
import { GeneralCustomer } from './general-customers';
import { Lab } from './labs';

export * from './customers';
export * from './general-customers';
export * from './labs';
export * from './consumer.model';
export * from './dto';

export const ConsumerEntities = [Customer, GeneralCustomer, Lab];
