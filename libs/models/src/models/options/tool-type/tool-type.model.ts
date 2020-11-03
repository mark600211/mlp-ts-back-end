import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { ToolTypeBase } from './tool-type-base.model';
import { ToolTypeEvent } from './tool-type-event.model';

@Entity()
@ObjectType()
export class ToolType extends ToolTypeBase {
  @OneToMany(
    type => ToolTypeEvent,
    events => events.payload,
    { nullable: true },
  )
  events: ToolTypeEvent[];
}
