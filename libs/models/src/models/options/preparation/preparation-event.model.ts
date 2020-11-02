import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { Preparation } from './preparation.model';

@Entity()
export class PreparationEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  payload: Preparation;
}
