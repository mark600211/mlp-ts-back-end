import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { PreparationBase } from './preparation-base.model';
import { PreparationEvent } from './preparation-event.model';

@Entity()
@ObjectType()
export class Preparation extends PreparationBase {
  @OneToMany(
    type => PreparationEvent,
    events => events.preparation,
    { nullable: true },
  )
  events: PreparationEvent[];
}
