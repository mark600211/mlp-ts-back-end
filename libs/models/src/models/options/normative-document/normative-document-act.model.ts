import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { NormativeDocumentBase } from './normative-document-base.model';

@Entity()
@ObjectType()
export class NormativeDocumentAct extends NormativeDocumentBase {
  @ManyToMany(
    type => Act,
    acts => acts.normativeDocuments,
    { nullable: true },
  )
  acts: Act[];
}
