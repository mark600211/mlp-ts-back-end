import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { ObjectNameBase } from './object-name-base.model';

@Entity()
@ObjectType()
export class ObjectNameAct extends ObjectNameBase {
  @OneToMany(
    type => Act,
    acts => acts.objectName,
    { nullable: true },
  )
  acts: Act[];
}
