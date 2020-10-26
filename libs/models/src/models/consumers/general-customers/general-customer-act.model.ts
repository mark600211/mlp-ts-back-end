import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../';
import { GeneralCustomerBase } from './general-customer-base.model';

@Entity()
@ObjectType()
export class GeneralCustomerAct extends GeneralCustomerBase {
  @OneToMany(
    type => Act,
    act => act.generalCustomer,
  )
  acts: Act[];
}
