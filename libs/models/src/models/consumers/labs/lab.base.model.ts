import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { DefinedIndicatorBase } from '../../options/defined-indicator';
import { Consumer } from '../consumer.model';

@Entity()
@ObjectType()
export class LabBase extends Consumer {
  @OneToMany(
    type => DefinedIndicatorBase,
    definedIndicator => definedIndicator,
  )
  defidnedIndicators: DefinedIndicatorBase[];
}
