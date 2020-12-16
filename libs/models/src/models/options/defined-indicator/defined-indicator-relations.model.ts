import { ObjectType } from '@nestjs/graphql';
import { Entity, ManyToMany, ManyToOne } from 'typeorm';
import { TypeOfSample } from '..';
import { Act } from '../..';
import { Lab } from '../../consumers';
import { Option } from '../base-options.model';

@Entity()
@ObjectType()
export class DefinedIndicatorRelations extends Option {
  @ManyToMany(
    type => Act,
    acts => acts.definedIndicators,
    { nullable: true },
  )
  acts?: Act[];
  @ManyToOne(
    type => Lab,
    lab => lab.definedIndicators,
    { cascade: true },
  )
  lab: Lab;
  @ManyToOne(
    type => TypeOfSample,
    typeOfSample => typeOfSample.definedIndicators,
    { cascade: true },
  )
  typeOfSample: TypeOfSample;
}
