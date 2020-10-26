import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { Act } from '..';
import { ApplicationBase } from './application-base.model';

@Entity()
@ObjectType()
export class Application extends ApplicationBase {
  @ManyToOne(
    type => Act,
    act => act.applications,
    { cascade: true },
  )
  act: Act;
}
