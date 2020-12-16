import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../..';
import { Consumer } from '../consumer.model';

@Entity()
@ObjectType()
export class GeneralCustomer extends Consumer {
  @OneToMany(
    type => Act,
    act => act.generalCustomer,
  )
  acts: Act[];
}
