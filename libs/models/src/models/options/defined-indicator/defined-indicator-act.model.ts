import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Act } from '../../acts/act.model'
import { DefinedIndicatorsBase } from './defined-indicator-base.model';

@Entity()
@ObjectType()
export class DefinedIndicatorsAct extends DefinedIndicatorsBase {
  @ManyToMany(
    type => Act,
    acts => acts.definedIndicators,
    { nullable: true },
  )
  acts: Act[];
}
