import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { LabBase } from '../../consumers';
import { Option } from '../base-options.model';
import { TypeOfSample } from '../type-of-sample';

@Entity()
@ObjectType()
export class DefinedIndicatorBase extends Option {
  @ManyToOne(
    type => LabBase,
    lab => lab.defidnedIndicators,
  )
  lab: LabBase;
  @ManyToOne(
    type => TypeOfSample,
    typeOfSample => typeOfSample.definedIndicators,
  )
  typeOfSample: TypeOfSample;
}
