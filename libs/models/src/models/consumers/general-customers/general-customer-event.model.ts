import { Entity, JoinColumn } from 'typeorm';
import { GeneralCustomer } from './general-customer.model';
import { BaseEvent } from '../../base-event.model';

@Entity()
export class GeneralCustomerEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  payload: GeneralCustomer;
}
