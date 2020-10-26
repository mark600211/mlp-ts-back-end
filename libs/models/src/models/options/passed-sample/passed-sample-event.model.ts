import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { PassedSample } from './passed-sample.model';

@Entity()
export class PassedSampleEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  passedSample: PassedSample;
}
