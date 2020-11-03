import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { NormativeDocumentEvent } from './nd-event.model';
import { NormativeDocumentBase } from './normative-document-base.model';

@Entity()
@ObjectType()
export class NormativeDocument extends NormativeDocumentBase {
  @OneToMany(
    type => NormativeDocumentEvent,
    events => events.payload,
    { nullable: true },
  )
  events: NormativeDocumentEvent[];
}
