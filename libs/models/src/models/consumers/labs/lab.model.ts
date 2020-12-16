import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act, DefinedIndicator } from '../..';
import { Consumer } from '../consumer.model';

@Entity()
@ObjectType()
export class Lab extends Consumer {
  @OneToMany(
    type => Act,
    acts => acts.lab,
  )
  acts: Act[];
  @OneToMany(
    type => DefinedIndicator,
    definedIndicators => definedIndicators.lab,
  )
  definedIndicators: DefinedIndicator[];
}
