import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { ClimaticEnvironmentalBase } from './ce-base.model';

@Entity()
@ObjectType()
export class ClimaticEnvironmentalAct extends ClimaticEnvironmentalBase {
  @OneToMany(
    type => Act,
    acts => acts.climaticEnvironmental,
    { nullable: true },
  )
  acts: Act[];
}
