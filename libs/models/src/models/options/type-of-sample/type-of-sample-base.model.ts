import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { BaseOption } from '../base-options.model';
import { DefinedIndicatorBase } from '../defined-indicator';

@Entity()
@ObjectType()
export class TypeOfSampleBase extends BaseOption {
  @OneToMany(
    type => DefinedIndicatorBase,
    definedIndicators => definedIndicators.typeOfSample,
  )
  definedIndicators: DefinedIndicatorBase[];
}
