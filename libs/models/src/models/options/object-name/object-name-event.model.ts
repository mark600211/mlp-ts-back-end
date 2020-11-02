import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { ObjectName } from './object-name.model';

@Entity()
export class ObjectNameEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  payload: ObjectName;
}
