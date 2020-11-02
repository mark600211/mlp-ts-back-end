import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { Addition } from './addition.model';

@Entity()
export class AdditionEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  payload: Addition;
}
