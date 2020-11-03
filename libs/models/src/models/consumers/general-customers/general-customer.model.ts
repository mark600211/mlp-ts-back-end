import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { GeneralCustomerEvent } from './general-customer-event.model';
import { GeneralCustomerBase } from './general-customer-base.model';

@Entity()
@ObjectType()
export class GeneralCustomer extends GeneralCustomerBase {
  @OneToMany(
    type => GeneralCustomerEvent,
    events => events.payload,
    { nullable: true },
  )
  events: GeneralCustomerEvent[];
}
