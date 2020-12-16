import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { RepresentativeBase } from './representative-base.model';
import { Act } from '../..';

@Entity()
@ObjectType()
export class Representative extends RepresentativeBase {
  @OneToMany(
    type => Act,
    acts => acts.representative,
    { nullable: true },
  )
  acts: Act[];
}
