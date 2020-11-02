import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { Method } from './method.model';

@Entity()
export class MethodEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  payload: Method;
}
