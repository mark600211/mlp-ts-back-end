import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { BaseOption } from '../base-options.model';

@Entity()
@ObjectType()
export class NormativeDocument extends BaseOption {
  @OneToMany(
    type => NDEvent,
    events => events,
    { nullable: true },
  )
  @ManyToMany(
    type => Act,
    acts => acts.typeOfSample,
    { nullable: true },
  )
  acts: Act[];
}
