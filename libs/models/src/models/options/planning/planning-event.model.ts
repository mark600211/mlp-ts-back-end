import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { Planning } from './planning.model';

@Entity()
export class PlanningEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  planning: Planning;
}
