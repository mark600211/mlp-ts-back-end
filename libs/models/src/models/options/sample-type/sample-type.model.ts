import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { SampleTypeBase } from './sample-type-base.model';
import { SampleTypeEvent } from './sample-type-event.model';

@Entity()
@ObjectType()
export class SampleType extends SampleTypeBase {
  @OneToMany(
    type => SampleTypeEvent,
    events => events.sampleType,
    { nullable: true },
  )
  events: SampleTypeEvent[];
}
