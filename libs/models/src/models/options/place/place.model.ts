import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { PlaceBase } from './place-base.model';
import { PlaceEvent } from './place-event.model';

@Entity()
@ObjectType()
export class Place extends PlaceBase {
  @OneToMany(
    type => PlaceEvent,
    events => events.payload,
    { nullable: true },
  )
  events: PlaceEvent[];
}
