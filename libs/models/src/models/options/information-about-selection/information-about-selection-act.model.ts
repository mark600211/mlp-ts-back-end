import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Act } from '../../acts/act.model';
import { InformationAboutSelectionBase } from './information-about-selection-base.model';

@Entity()
@ObjectType()
export class InformationAboutSelectionAct extends InformationAboutSelectionBase {
  @OneToMany(
    type => Act,
    acts => acts.informationAboutSelection,
    { nullable: true },
  )
  acts: Act[];
}
