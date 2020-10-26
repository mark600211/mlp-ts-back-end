import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { PlaceBase } from './place-base.model';

@Entity()
@ObjectType()
export class PlaceAct extends PlaceBase {
  @OneToMany(
    type => Act,
    acts => acts.place,
    { nullable: true },
  )
  acts: Act[];
}
