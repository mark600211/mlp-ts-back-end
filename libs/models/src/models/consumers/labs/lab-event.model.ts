import { Entity, JoinColumn } from 'typeorm';
import { Lab } from './lab.model';
import { BaseEvent } from '../../base-event.model';

@Entity()
export class LabEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  lab: Lab;
}
