import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { BaseOption } from '../base-options.model';
import { ToolTypeEvent } from './tool-type-event.model';

@Entity()
@ObjectType()
export class ToolType extends BaseOption {
  @OneToMany(
    type => ToolTypeEvent,
    events => events.toolType,
    { nullable: true },
  )
  @OneToMany(
    type => Act,
    acts => acts.typeOfSample,
    { nullable: true },
  )
  acts: Act[];
}
