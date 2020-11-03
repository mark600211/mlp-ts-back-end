import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { SampleBase } from './sample-base.model';
import { SampleEvent } from './sample-event.model';

@Entity()
@ObjectType()
export class Sample extends SampleBase {
  @OneToMany(
    type => SampleEvent,
    events => events.payload,
    { nullable: true },
  )
  events: SampleEvent[];
}
