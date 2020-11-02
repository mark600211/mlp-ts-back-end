import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { Goal } from './goal.model';

@Entity()
export class GoalEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  payload: Goal;
}
