import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../..';
import { CustomerBase } from './customer-base.model';

@Entity()
@ObjectType()
export class CustomerAct extends CustomerBase {
  @OneToMany(
    type => Act,
    acts => acts.customer,
  )
  acts: Act[];
}
