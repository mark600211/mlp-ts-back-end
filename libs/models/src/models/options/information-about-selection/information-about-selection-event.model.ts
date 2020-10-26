import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { InformationAboutSelection } from './information-about-selection.model';

@Entity()
export class InformationAboutSelectionEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  informationAboutSelection: InformationAboutSelection;
}
