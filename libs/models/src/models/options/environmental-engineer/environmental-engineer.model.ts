import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { EnvironmentalEngineerBase } from './environmental-engineer-base.model';
import { EnvironmentalEngineerEvent } from './environmental-engineer-event.model';

@Entity()
@ObjectType()
export class EnvironmentalEngineer extends EnvironmentalEngineerBase {
  @OneToMany(
    type => EnvironmentalEngineerEvent,
    events => events.environmentalEngineer,
    { nullable: true },
  )
  events: EnvironmentalEngineerEvent[];
}
