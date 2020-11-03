import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { DefinedIndicator } from '..';
import { TypeOfSampleEvent } from './tos-event.model';
import { TypeOfSampleBase } from './type-of-sample-base.model';

@Entity()
@ObjectType()
export class TypeOfSample extends TypeOfSampleBase {
  @OneToMany(
    type => TypeOfSampleEvent,
    events => events.payload,
    { nullable: true },
  )
  events: TypeOfSampleEvent[];
  @OneToMany(
    type => DefinedIndicator,
    definedIndicators => definedIndicators.typeOfSample,
  )
  definedIndicators: DefinedIndicator[];
}
