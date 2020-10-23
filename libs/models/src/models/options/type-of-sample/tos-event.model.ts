import { TypeOfSample } from 'apps/acts/src/modules/type-of-sample/models/type-of-sample.model';
import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';

@Entity()
export class TOSEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  tos: TypeOfSample;
}
