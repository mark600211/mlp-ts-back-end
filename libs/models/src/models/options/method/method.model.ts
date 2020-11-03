import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { MethodEvent } from './method-event.model';
import { MethodBase } from './method-base.model';

@Entity()
@ObjectType()
export class Method extends MethodBase {
  @OneToMany(
    type => MethodEvent,
    events => events.payload,
    { nullable: true },
  )
  events: MethodEvent[];
}
