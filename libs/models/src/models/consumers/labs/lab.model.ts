import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { DefinedIndicator } from '../..';
import { LabEvent } from './lab-event.model';
import { LabBase } from './lab.base.model';

@Entity()
@ObjectType()
export class Lab extends LabBase {
  @OneToMany(
    type => LabEvent,
    events => events.payload,
    { nullable: true },
  )
  events: LabEvent[];
  @OneToMany(
    type => DefinedIndicator,
    definedIndicator => definedIndicator,
  )
  defidnedIndicators: DefinedIndicator[];
}
