import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { PassedSampleBase } from './passed-sample-base.model';

@Entity()
@ObjectType()
export class PassedSampleAct extends PassedSampleBase {
  @OneToMany(
    type => Act,
    acts => acts.passedSample,
    { nullable: true },
  )
  acts: Act[];
}
