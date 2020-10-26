import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { NDEvent } from './nd-event.model';
import { NormativeDocumentBase } from './normative-document-base.model';

@Entity()
@ObjectType()
export class NormativeDocument extends NormativeDocumentBase {
  @OneToMany(
    type => NDEvent,
    events => events.normativeDocuemtns,
    { nullable: true },
  )
  events: NDEvent[];
}
