import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { LabEvent } from './lab-event.model';
import { Consumer } from '../consumer.model';

@Entity()
@ObjectType()
export class Lab extends Consumer {
  @OneToMany(
    type => Act,
    acts => acts.customer,
  )
  acts: Act[];
  @OneToMany(
    type => LabEvent,
    events => events.lab,
    { nullable: true },
  )
  events: LabEvent[];
}
