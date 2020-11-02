import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DefinedIndicatorEvent } from './defined-indicator-event.model';
import { DefinedIndicatorRelations } from './defined-indicator-relations';

@Entity()
@ObjectType()
export class DefinedIndicator extends DefinedIndicatorRelations {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @OneToMany(
    type => DefinedIndicatorEvent,
    events => events,
    { nullable: true },
  )
  events: DefinedIndicatorEvent[];
}
