import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { BaseOption } from '../base-options.model';
import { ClimaticEnvironmentalEvent } from './ce-event.model';

@Entity()
@ObjectType()
export class ClimaticEnvironmental extends BaseOption {
  @OneToMany(
    type => ClimaticEnvironmentalEvent,
    events => events.ce,
    { nullable: true },
  )
  @OneToMany(
    type => Act,
    acts => acts.typeOfSample,
    { nullable: true },
  )
  acts: Act[];
}
