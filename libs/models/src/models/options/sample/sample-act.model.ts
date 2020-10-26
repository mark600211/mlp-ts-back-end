import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { SampleBase } from './sample-base.model';

@Entity()
@ObjectType()
export class SampleAct extends SampleBase {
  @ManyToMany(
    type => Act,
    acts => acts.sample,
    { nullable: true },
  )
  acts: Act[];
}
