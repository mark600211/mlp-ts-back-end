import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../..';
import { EnvironmentalEngineerBase } from './environmental-engineer-base.model';

@Entity()
@ObjectType()
export class EnvironmentalEngineer extends EnvironmentalEngineerBase {
  @OneToMany(
    type => Act,
    acts => acts.environmentalEngineer,
    { nullable: true },
  )
  acts: Act[];
}
