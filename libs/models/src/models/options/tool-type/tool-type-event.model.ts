import { Entity, JoinColumn } from 'typeorm';
import { BaseEvent } from '../../base-event.model';
import { ToolType } from './tool-type.model';

@Entity()
export class ToolTypeEvent extends BaseEvent {
  @JoinColumn({ name: 'payload' })
  toolType: ToolType;
}
