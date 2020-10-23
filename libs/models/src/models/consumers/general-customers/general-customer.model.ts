import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { GSEvent } from './general-customer-event.model';
import { Consumer } from '../consumer.model';

@Entity()
@ObjectType()
export class GeneralCustomer extends Consumer {
  @OneToMany(
    type => GSEvent,
    events => events.general_customer,
    { nullable: true },
  )
  events: GSEvent[];
  @OneToMany(
    type => Act,
    act => act.generalCustomer,
  )
  acts: Act[];
}
