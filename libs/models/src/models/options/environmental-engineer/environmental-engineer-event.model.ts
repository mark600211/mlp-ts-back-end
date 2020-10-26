import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { EnvironmentalEngineer } from './environmental-engineer.model';

@Entity()
export class EnvironmentalEngineerEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  environmentalEngineer: EnvironmentalEngineer;
}
