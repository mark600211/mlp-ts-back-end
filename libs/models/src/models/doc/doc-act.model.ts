import { Entity, OneToMany } from 'typeorm';
import { ActIdBase } from '../options/act-id-base.model';
import { Doc } from './doc.model';

@Entity()
export class DocActId extends ActIdBase {
  @OneToMany(
    type => Doc,
    docs => docs.act,
  )
  docs: Doc[];
}
