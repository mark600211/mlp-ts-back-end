import { Entity, JoinColumn, ManyToMany } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { NormativeDocument, Place } from './normative-document.model';

@Entity()
export class NDEvent extends BaseEvent {
  @ManyToMany
  @JoinColumn({ name: 'payload' })
  normativeDocuemtns: NormativeDocument[];
}
