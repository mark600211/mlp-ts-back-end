import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { BaseOption } from '../base-options.model';
import { ObjectNameEvent } from './object-name-event.model';

@Entity()
@ObjectType()
export class ObjectName extends BaseOption {
  @OneToMany(
    type => ObjectNameEvent,
    events => events.objectName,
    { nullable: true },
  )
  @OneToMany(
    type => Act,
    acts => acts.typeOfSample,
    { nullable: true },
  )
  acts: Act[];
}
