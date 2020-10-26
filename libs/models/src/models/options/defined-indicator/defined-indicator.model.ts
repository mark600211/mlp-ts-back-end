import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { DefinedIndicatorBase } from './defined-indicator-base.model';
import { DefinedIndicatorEvent } from './defined-indicator-event.model';

@Entity()
@ObjectType()
export class DefinedIndicator extends DefinedIndicatorBase {
  @OneToMany(
    type => DefinedIndicatorEvent,
    events => events,
    { nullable: true },
  )
  events: DefinedIndicatorEvent[];
}
