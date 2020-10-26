import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { GoalBase } from './goal-base.model';
import { GoalEvent } from './goal-event.model';

@Entity()
@ObjectType()
export class Goal extends GoalBase {
  @OneToMany(
    type => GoalEvent,
    events => events.goal,
    { nullable: true },
  )
  events: GoalEvent[];
}
