import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { PreparationBase } from './preparation-base.model';

@Entity()
@ObjectType()
export class PreparationAct extends PreparationBase {
  @ManyToMany(
    type => Act,
    acts => acts.preparation,
    { nullable: true },
  )
  acts: Act[];
}
