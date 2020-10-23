import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { SampleType } from './sample-type.model';

@Entity()
export class SampleTypeEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  sampleType: SampleType;
}
