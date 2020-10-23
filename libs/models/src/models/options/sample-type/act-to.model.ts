import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';

@Entity()
@ObjectType()
export class ActTo {
  @OneToMany(
    type => Act,
    acts => acts.typeOfSample,
    { nullable: true },
  )
  acts: Act[];
}
