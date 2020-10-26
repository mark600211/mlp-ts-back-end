import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { LabEvent } from './lab-event.model';
import { LabBase } from './lab.base.model';

@Entity()
@ObjectType()
export class Lab extends LabBase {
  @OneToMany(
    type => LabEvent,
    events => events.lab,
    { nullable: true },
  )
  events: LabEvent[];
}
