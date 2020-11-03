import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { PassedSampleEvent } from './passed-sample-event.model';
import { PassedSampleBase } from './passed-sample-base.model';

@Entity()
@ObjectType()
export class PassedSample extends PassedSampleBase {
  @OneToMany(
    type => PassedSampleEvent,
    events => events.payload,
    { nullable: true },
  )
  events: PassedSampleEvent[];
}
