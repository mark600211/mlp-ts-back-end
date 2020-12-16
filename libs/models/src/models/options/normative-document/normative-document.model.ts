import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToMany } from 'typeorm';
import { Act } from '../..';
import { NormativeDocumentBase } from './normative-document-base.model';

@Entity()
@ObjectType()
export class NormativeDocument extends NormativeDocumentBase {
  @ManyToMany(
    type => Act,
    acts => acts.normativeDocuments,
    { nullable: true },
  )
  acts: Act[];
}
