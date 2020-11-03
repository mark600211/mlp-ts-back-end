import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { ClimaticEnvironmentalBase } from './ce-base.model';
import { ClimaticEnvironmentalEvent } from './ce-event.model';

@Entity()
@ObjectType()
export class ClimaticEnvironmental extends ClimaticEnvironmentalBase {
  @OneToMany(
    type => ClimaticEnvironmentalEvent,
    events => events.payload,
    { nullable: true },
  )
  evnets: ClimaticEnvironmentalEvent[];
}
