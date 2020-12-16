import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { DefinedIndicator } from '..';
import { Act } from '../..';
import { TypeOfSampleBase } from './type-of-sample-base.model';

@Entity()
@ObjectType()
export class TypeOfSample extends TypeOfSampleBase {
  @OneToMany(
    type => Act,
    acts => acts.typeOfSample,
    { nullable: true },
  )
  acts: Act[];
  @OneToMany(
    type => DefinedIndicator,
    definedIndicators => definedIndicators.typeOfSample,
  )
  definedIndicators: DefinedIndicator[];
}
