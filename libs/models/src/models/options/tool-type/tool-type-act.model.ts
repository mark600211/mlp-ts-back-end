import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { ToolTypeBase } from './tool-type-base.model';

@Entity()
@ObjectType()
export class ToolTypeAct extends ToolTypeBase {
  @OneToMany(
    type => Act,
    acts => acts.toolType,
    { nullable: true },
  )
  acts: Act[];
}
