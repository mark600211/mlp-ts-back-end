import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { TypeOfSampleBase } from './type-of-sample-base.model';

@Entity()
@ObjectType()
export class TypeOfSampleAct extends TypeOfSampleBase {
  @OneToMany(
    type => Act,
    acts => acts.typeOfSample,
    { nullable: true },
  )
  acts: Act[];
}
