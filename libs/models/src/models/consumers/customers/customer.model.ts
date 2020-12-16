import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../..';
import { Consumer } from '../consumer.model';

@Entity()
@ObjectType()
export class Customer extends Consumer {
  @OneToMany(
    type => Act,
    acts => acts.customer,
  )
  acts: Act[];
}
