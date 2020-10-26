import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { AdditionBase } from './addition-base.model';

@Entity()
@ObjectType()
export class AdditionAct extends AdditionBase {
  @OneToMany(
    type => Act,
    acts => acts.additions,
    { nullable: true },
  )
  acts: Act[];
}
