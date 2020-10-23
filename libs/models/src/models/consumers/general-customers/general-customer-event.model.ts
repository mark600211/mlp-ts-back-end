import { Entity, JoinColumn } from 'typeorm';
import { GeneralCustomer } from './general-customer.model';
import { BaseEvent } from '../../base-event.model';

@Entity()
export class GSEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  general_customer: GeneralCustomer;
}
