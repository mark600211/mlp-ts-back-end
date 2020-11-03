import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { AdditionBase } from './addition-base.model';
import { AdditionEvent } from './addition-event.model';

@Entity()
@ObjectType()
export class Addition extends AdditionBase {
  @OneToMany(
    type => AdditionEvent,
    events => events.payload,
    { nullable: true },
  )
  events: AdditionEvent[];
}
