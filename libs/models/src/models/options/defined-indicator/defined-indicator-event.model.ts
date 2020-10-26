import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { DefinedIndicator } from './defined-indicator.model';

@Entity()
export class DefinedIndicatorEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  definedIndicator: DefinedIndicator;
}
