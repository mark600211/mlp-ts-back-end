/* eslint-disable @typescript-eslint/camelcase */
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ActEvent } from './act-event.model';
import { ActBase } from './act-base.model';

export enum ActStatus {
  CREATED = 'CREATED',
  REGISTERED = 'REGISTERED',
  PROTOCOL = 'PROTOCOL',
  FULL = 'FULL',
}

@Entity()
@ObjectType()
export class Act extends ActBase {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column({ type: 'enum', enum: ActStatus, default: ActStatus.CREATED })
  status: string;
  @Field(type => Boolean)
  @Column({ type: 'boolean', default: true })
  isCorrect: boolean;
  @OneToMany(
    type => ActEvent,
    events => events.act,
    { cascade: true },
  )
  events?: ActEvent[];
}
