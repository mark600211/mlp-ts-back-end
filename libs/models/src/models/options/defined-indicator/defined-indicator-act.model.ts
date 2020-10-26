import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { DefinedIndicatorBase } from './defined-indicator-base.model';

@Entity()
@ObjectType()
export class DefinedIndicatorAct extends DefinedIndicatorBase {
  @ManyToMany(
    type => Act,
    acts => acts.definedIndicators,
    { nullable: true },
  )
  acts: Act[];
}
