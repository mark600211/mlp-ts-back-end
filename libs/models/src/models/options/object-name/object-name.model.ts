import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { ObjectNameBase } from './object-name-base.model';
import { ObjectNameEvent } from './object-name-event.model';

@Entity()
@ObjectType()
export class ObjectName extends ObjectNameBase {
  @OneToMany(
    type => ObjectNameEvent,
    events => events.objectName,
    { nullable: true },
  )
  events: ObjectNameEvent[];
}
