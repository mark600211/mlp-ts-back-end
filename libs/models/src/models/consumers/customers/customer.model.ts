import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { CustomerEvent } from '.';
import { CustomerBase } from './customer-base.model';

@Entity()
@ObjectType()
export class Customer extends CustomerBase {
  @OneToMany(
    type => CustomerEvent,
    events => events.customer,
    { nullable: true },
  )
  events: CustomerEvent[];
}
