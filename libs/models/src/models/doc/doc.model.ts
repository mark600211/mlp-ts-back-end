import { ObjectType } from '@nestjs/graphql';
import { OneToMany, Entity } from 'typeorm';
import { DocEvent } from './doc-event.model';

@Entity()
@ObjectType()
export class Doc {
  @OneToMany(
    type => DocEvent,
    event => event.doc,
    { nullable: true, onDelete: 'CASCADE' },
  )
  docEvents?: DocEvent[];
}
