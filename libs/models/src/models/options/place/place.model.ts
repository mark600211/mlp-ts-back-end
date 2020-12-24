import { InputType, ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../..';
import { ApplicationBase } from '../../application';
import { PlaceBase } from './place-base.model';

@Entity()
@ObjectType()
@InputType('InputPlace')
export class Place extends PlaceBase {
  @OneToMany(
    type => Act,
    acts => acts.place,
    { nullable: true },
  )
  acts: Act[];
  @OneToMany(
    type => ApplicationBase,
    app => app.place,
    { nullable: true },
  )
  application: ApplicationBase[];
}
