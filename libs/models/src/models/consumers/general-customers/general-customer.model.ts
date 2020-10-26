import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { GSEvent } from './general-customer-event.model';
import { GeneralCustomerBase } from './general-customer-base.model';

@Entity()
@ObjectType()
export class GeneralCustomer extends GeneralCustomerBase {
  @OneToMany(
    type => GSEvent,
    events => events.general_customer,
    { nullable: true },
  )
  events: GSEvent[];
}
