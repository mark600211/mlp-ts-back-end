/* eslint-disable @typescript-eslint/camelcase */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
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
}
