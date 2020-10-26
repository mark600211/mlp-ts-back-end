import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { Act } from '../acts/act.model';

@Entity()
@ObjectType()
export class DocAct {
  @ManyToOne(
    type => Act,
    act => act.docs,
    { cascade: true, onUpdate: 'CASCADE' },
  )
  act?: Act;
}
