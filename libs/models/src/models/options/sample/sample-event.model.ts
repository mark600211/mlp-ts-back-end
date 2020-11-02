import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { Sample } from './sample.model';

@Entity()
export class SampleEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  payload: Sample;
}
