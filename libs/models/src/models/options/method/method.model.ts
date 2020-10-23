import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { BaseOption } from '../base-options.model';
import { MethodEvent } from './method-event.model';

@Entity()
@ObjectType()
export class Method extends BaseOption {
  @OneToMany(
    type => MethodEvent,
    events => events.method,
    { nullable: true },
  )
  @OneToMany(
    type => Act,
    acts => acts.typeOfSample,
    { nullable: true },
  )
  acts: Act[];
}
