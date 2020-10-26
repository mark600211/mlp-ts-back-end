import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { PlanningBase } from './planning-base.model';

@Entity()
@ObjectType()
export class PlanningAct extends PlanningBase {
  @OneToMany(
    type => Act,
    acts => acts.planning,
    { nullable: true },
  )
  acts: Act[];
}
