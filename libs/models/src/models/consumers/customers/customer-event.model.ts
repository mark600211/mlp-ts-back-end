import { Entity, JoinColumn } from 'typeorm';
import { Customer } from './customer.model';
import { BaseEvent } from '../../base-event.model';

@Entity()
export class CustomerEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  payload: Customer;
}
