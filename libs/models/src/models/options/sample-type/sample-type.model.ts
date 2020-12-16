import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToMany } from 'typeorm';
import { Act } from '../..';
import { SampleTypeBase } from './sample-type-base.model';

@Entity()
@ObjectType()
export class SampleType extends SampleTypeBase {
  @ManyToMany(
    type => Act,
    acts => acts.sampleType,
    { nullable: true },
  )
  acts: Act[];
}
