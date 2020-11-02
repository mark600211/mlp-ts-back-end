import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Act } from '../../acts/act.model';
import { DefinedIndicatorBase } from './defined-indicator-base.model';

@Entity()
@ObjectType()
export class DefinedIndicatorAct extends DefinedIndicatorBase {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @ManyToMany(
    type => Act,
    acts => acts.definedIndicators,
    { nullable: true },
  )
  acts: Act[];
}
