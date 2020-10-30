import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { DefinedIndicatorBase } from '..';
import { TOSEvent } from './tos-event.model';
import { TypeOfSampleBase } from './type-of-sample-base.model';

@Entity()
@ObjectType()
export class TypeOfSample extends TypeOfSampleBase {
  @OneToMany(
    type => TOSEvent,
    events => events.tos,
    { nullable: true },
  )
  events: TOSEvent[];
  @OneToMany(
    type => DefinedIndicatorBase,
    definedIndicators => definedIndicators.typeOfSample,
  )
  definedIndicators: DefinedIndicatorBase[];
}
