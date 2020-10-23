import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { BaseOption } from '../base-options.model';
import { PlaceEvent } from './place-event.model';

@Entity()
@ObjectType()
export class Place extends BaseOption {
  @OneToMany(
    type => PlaceEvent,
    events => events.place,
    { nullable: true },
  )
  @OneToMany(
    type => Act,
    acts => acts.typeOfSample,
    { nullable: true },
  )
  acts: Act[];
}
