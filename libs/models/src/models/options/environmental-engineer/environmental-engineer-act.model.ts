import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { EnvironmentalEngineerBase } from './environmental-engineer-base.model';

@Entity()
@ObjectType()
export class EnvironmentalEngineerAct extends EnvironmentalEngineerBase {
  @OneToMany(
    type => Act,
    acts => acts.environmentalEngineer,
    { nullable: true },
  )
  acts: Act[];
}
