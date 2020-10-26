import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne } from 'typeorm';
import { LabBase } from '../../consumers';
import { BaseOption } from '../base-options.model';
import { TypeOfSampleBase } from '../type-of-sample';

@Entity()
@ObjectType()
export class DefinedIndicatorBase extends BaseOption {
  @ManyToOne(
    type => LabBase,
    lab => lab.defidnedIndicators,
  )
  lab: LabBase;
  @ManyToOne(
    type => TypeOfSampleBase,
    typeOfSample => typeOfSample.definedIndicators,
  )
  typeOfSample: TypeOfSampleBase;
}
