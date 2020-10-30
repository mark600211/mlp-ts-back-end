import { ObjectType } from '@nestjs/graphql';
import { OneToMany, Entity, ManyToOne } from 'typeorm';
import { DocActId } from './doc-act.model';
import { DocBase } from './doc-base.model';
import { DocEvent } from './doc-event.model';

@Entity()
@ObjectType()
export class Doc extends DocBase {
  @OneToMany(
    type => DocEvent,
    events => events.doc,
    { nullable: true, onDelete: 'CASCADE' },
  )
  docEvents?: DocEvent[];
  @ManyToOne(
    type => DocActId,
    act => act.docs,
  )
  act: DocActId;
}
