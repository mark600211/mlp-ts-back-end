import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { BaseOption } from '../base-options.model';
import { SampleTypeEvent } from './sample-type-event.model';

@Entity()
@ObjectType()
export class SampleType extends BaseOption {
  @OneToMany(
    type => SampleTypeEvent,
    events => events.sampleType,
    { nullable: true },
  )
  events;
}
