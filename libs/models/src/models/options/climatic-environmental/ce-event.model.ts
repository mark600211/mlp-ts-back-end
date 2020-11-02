import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { ClimaticEnvironmental } from './ce.model';

@Entity()
export class ClimaticEnvironmentalEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  payload: ClimaticEnvironmental;
}
