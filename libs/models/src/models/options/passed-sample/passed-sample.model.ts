import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { PassedSampleBase } from './passed-sample-base.model';
import { Act } from '../..';

@Entity()
@ObjectType()
export class PassedSample extends PassedSampleBase {
  @OneToMany(
    type => Act,
    acts => acts.passedSample,
    { nullable: true },
  )
  acts?: Act[];
}
