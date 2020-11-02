import { Entity, JoinColumn } from 'typeorm';
import { TypeOfSample } from '.';
import { BaseEvent } from '../../base-event.model';

@Entity()
export class TypeOfSampleEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  payload: TypeOfSample;
}
