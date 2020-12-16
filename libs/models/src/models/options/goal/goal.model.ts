import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../..';
import { GoalBase } from './goal-base.model';

@Entity()
@ObjectType()
export class Goal extends GoalBase {
  @OneToMany(
    type => Act,
    acts => acts.goal,
    { nullable: true },
  )
  acts: Act[];
}
