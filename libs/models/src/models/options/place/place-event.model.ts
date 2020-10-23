import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { Place } from './place.model';

@Entity()
export class PlaceEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  place: Place;
}
