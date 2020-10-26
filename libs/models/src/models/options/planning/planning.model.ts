import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { PlanningBase } from './planning-base.model';
import { PlanningEvent } from './planning-event.model';

@Entity()
@ObjectType()
export class Planning extends PlanningBase {
  @OneToMany(
    type => PlanningEvent,
    events => events.planning,
    { nullable: true },
  )
  events: PlanningEvent[];
}
