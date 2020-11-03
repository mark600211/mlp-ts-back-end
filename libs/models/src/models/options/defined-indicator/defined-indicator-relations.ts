import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { DefinedIndicatorBase, LabId } from '.';
import { TypeOfSample } from '..';
import { Option } from '../base-options.model';

@Entity()
@ObjectType()
export class DefinedIndicatorRelations extends Option {
  @ManyToOne(
    type => LabId,
    lab => lab.definedIndicators,
  )
  lab: LabId;
  @ManyToOne(
    type => TypeOfSample,
    typeOfSample => typeOfSample.definedIndicators,
  )
  typeOfSample: TypeOfSample;
}
