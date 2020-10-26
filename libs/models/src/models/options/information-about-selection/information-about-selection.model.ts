import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { InformationAboutSelectionBase } from './information-about-selection-base.model';
import { InformationAboutSelectionEvent } from './information-about-selection-event.model';

@Entity()
@ObjectType()
export class InformationAboutSelection extends InformationAboutSelectionBase {
  @OneToMany(
    type => InformationAboutSelectionEvent,
    events => events.informationAboutSelection,
    { nullable: true },
  )
  events: InformationAboutSelectionEvent[];
}
