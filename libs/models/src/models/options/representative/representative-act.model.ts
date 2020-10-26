import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { RepresentativeBase } from './representative-base.model';

@Entity()
@ObjectType()
export class RepresentativeAct extends RepresentativeBase {
  @OneToMany(
    type => Act,
    acts => acts.representative,
    { nullable: true },
  )
  acts: Act[];
}
