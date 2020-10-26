import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { MethodBase } from './method-base.model';

@Entity()
@ObjectType()
export class MethodAct extends MethodBase {
  @OneToMany(
    type => Act,
    acts => acts.method,
    { nullable: true },
  )
  acts: Act[];
}
