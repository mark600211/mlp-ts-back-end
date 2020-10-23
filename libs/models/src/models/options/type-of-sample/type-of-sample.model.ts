import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { BaseOption } from '../base-options.model';
import { TOSEvent } from './tos-event.model';

@Entity()
@ObjectType()
export class TypeOfSample extends BaseOption {
  @OneToMany(
    type => TOSEvent,
    events => events.tos,
    { nullable: true },
  )
  @OneToMany(
    type => Act,
    acts => acts.typeOfSample,
    { nullable: true },
  )
  acts: Act[];
}
