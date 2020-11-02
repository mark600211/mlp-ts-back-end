import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { Representative } from './representative.model';

@Entity()
export class RepresentativeEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  payload: Representative;
}
