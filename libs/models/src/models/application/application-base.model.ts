import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateAndTime } from '../date-time.model';

@Entity()
@InputType('ApplicationInput')
@ObjectType()
export class ApplicationBase {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field(type => String)
  @Column({ nullable: true })
  public place?: string;
  @Field(type => DateAndTime)
  @Column(type => DateAndTime)
  public datetime: DateAndTime;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
