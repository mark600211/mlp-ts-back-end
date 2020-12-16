import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { MethodBase } from './method-base.model';
import { Act } from '../..';

@Entity()
@ObjectType()
export class Method extends MethodBase {
  @OneToMany(
    type => Act,
    acts => acts.method,
    { nullable: true },
  )
  acts: Act[];
}
