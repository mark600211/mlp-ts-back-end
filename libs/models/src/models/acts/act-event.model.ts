import { Entity, JoinColumn } from 'typeorm';
import { Act } from './act.model';
import { BaseEvent } from '../base-event.model';

@Entity()
export class ActEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  act: Act;
}
