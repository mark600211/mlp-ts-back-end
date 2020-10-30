import { Entity, JoinColumn } from 'typeorm';
import { TypeOfSample } from '.';
import { BaseEvent } from '../../base-event.model';

@Entity()
export class TOSEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  tos: TypeOfSample;
}
