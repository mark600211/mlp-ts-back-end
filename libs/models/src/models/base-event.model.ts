import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AllowEvents {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

@Entity()
export class BaseEvent {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Column({ type: 'enum', enum: AllowEvents, nullable: true })
  event_type: string;
  @Column()
  event_key: string;
  @Column()
  aggregateType: string;
  @Column()
  aggregateid: string;
  @CreateDateColumn()
  createdAt?: string;
  @UpdateDateColumn()
  updatedAt?: string;
}
