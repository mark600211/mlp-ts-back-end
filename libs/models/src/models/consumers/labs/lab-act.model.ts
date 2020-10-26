import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { LabBase } from './lab.base.model';

@Entity()
@ObjectType()
export class LabAct extends LabBase {
  @OneToMany(
    type => Act,
    acts => acts.customer,
  )
  acts: Act[];
}
