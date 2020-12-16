import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToMany } from 'typeorm';
import { Act } from '../..';
import { PreparationBase } from './preparation-base.model';

@Entity()
@ObjectType()
export class Preparation extends PreparationBase {
  @ManyToMany(
    type => Act,
    acts => acts.preparation,
    { nullable: true },
  )
  acts: Act[];
}
