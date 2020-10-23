import { Entity, JoinColumn } from 'typeorm';
import { Doc } from './doc.model';
import { BaseEvent } from '../base-event.model';

@Entity()
export class DocEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  doc: Doc;
}
