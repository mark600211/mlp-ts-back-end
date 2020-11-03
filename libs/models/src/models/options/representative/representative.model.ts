import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { RepresentativeEvent } from './representative-event.model';
import { RepresentativeBase } from './representative-base.model';

@Entity()
@ObjectType()
export class Representative extends RepresentativeBase {
  @OneToMany(
    type => RepresentativeEvent,
    events => events.payload,
    { nullable: true },
  )
  events: RepresentativeEvent[];
}
