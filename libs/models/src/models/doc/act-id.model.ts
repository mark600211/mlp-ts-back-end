import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Doc } from '.';

@Entity()
export class ActIdDoc {
  @PrimaryColumn()
  id: string;
  @OneToMany(
    type => Doc,
    docs => docs.actId,
  )
  docs?: Doc[];
}
