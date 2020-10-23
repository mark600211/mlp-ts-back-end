import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { CustomerEvent } from './customer-event.model';
import { Consumer } from '../consumer.model';

@Entity()
@ObjectType()
export class Customer extends Consumer {
  @OneToMany(
    type => Act,
    acts => acts.customer,
  )
  acts: Act[];
  @OneToMany(
    type => CustomerEvent,
    events => events.customer,
    { nullable: true },
  )
  events: CustomerEvent[];
}
