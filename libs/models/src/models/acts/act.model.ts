/* eslint-disable @typescript-eslint/camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';

import { Customer } from '../consumers/customers/customer.model';
import { GeneralCustomer } from '../consumers/general-customers/general-customer.model';
import { Lab } from '../consumers/labs/lab.model';
import { Doc } from '../doc/doc.model';
import { ActEvent } from './act-event.model';
import { DateAndTime } from '../date-time.model';
import { TypeOfSample } from '../options/type-of-sample/type-of-sample.model';
import { ObjectName } from '../options/object-name/object-name.model';
import { Place } from '../options/place/place.model';
import { Method } from '../options/method/method.model';
import { ToolType } from '../options/tool-type/tool-type.model';
import { ClimaticEnvironmental } from '../options/climatic-environmental/ce.model';

export enum ActStatus {
  CREATED = 'CREATED',
  REGISTERED = 'REGISTERED',
  PROTOCOL = 'PROTOCOL',
  FULL = 'FULL',
}

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Act {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field(type => String)
  @Column()
  name: string;
  @Field(type => Customer)
  @ManyToOne(
    type => Customer,
    coustomer => coustomer.acts,
    { cascade: true, onUpdate: 'CASCADE', eager: true },
  )
  customer: Customer;
  @Field(type => GeneralCustomer)
  @ManyToOne(
    type => GeneralCustomer,
    general_customer => general_customer.acts,
    { cascade: true, onUpdate: 'CASCADE', eager: true },
  )
  generalCustomer: GeneralCustomer;
  @Field(type => Lab)
  @ManyToOne(
    type => Lab,
    lab => lab.acts,
    { cascade: true, onUpdate: 'CASCADE', eager: true },
  )
  lab: Lab;
  @Field(type => [Doc], { nullable: true })
  @OneToMany(
    type => Doc,
    docs => docs.act,
    { cascade: true, eager: true, onUpdate: 'CASCADE' },
  )
  docs: Doc[];
  @Field(type => TypeOfSample)
  @ManyToOne(
    type => TypeOfSample,
    tos => tos.acts,
    { cascade: true, eager: true },
  )
  typeOfSample: TypeOfSample;
  @Field()
  @ManyToOne(
    type => ObjectName,
    objectName => objectName.acts,
    { cascade: true, eager: true },
  )
  objectName?: ObjectName;
  @Field()
  @ManyToOne(
    type => Place,
    place => place.acts,
    { cascade: true, eager: true },
  )
  place?: Place;
  @Field(type => DateAndTime)
  @Column(type => DateAndTime)
  datetime: DateAndTime;
  @Field()
  @ManyToOne(
    type => Method,
    method => method.acts,
    { cascade: true, eager: true },
  )
  method?: Method;
  @Field()
  @ManyToOne(
    type => ToolType,
    toolType => toolType.acts,
    { cascade: true, eager: true },
  )
  toolType?: ToolType;
  @Field()
  @ManyToOne(
    type => ClimaticEnvironmental,
    climaticEnvironmental => climaticEnvironmental.acts,
    { cascade: true, eager: true },
  )
  climaticEnvironmental?: ClimaticEnvironmental;
  @Field()
  @Column({ nullable: true })
  planning?: string;
  @Field(type => [String])
  @ManyToMany(() => NormativeDocument, { cascade: true, eager: true })
  @JoinTable()
  normativeDocuments?: NormativeDocument[];
  @Field()
  @Column({ nullable: true })
  sampleType?: string;
  @Field(type => [String])
  @Column('text', { array: true, nullable: true })
  sample?: string[];
  @Field(type => [String])
  @Column('text', { array: true, nullable: true })
  preparation?: string[];
  @Field()
  @Column({ nullable: true })
  goal?: string;
  @Field(type => [String])
  @Column('text', { array: true, nullable: true })
  definedIndicators?: string[];
  @Field()
  @Column({ nullable: true })
  additions?: string;
  @Field()
  @Column({ nullable: true })
  informationAboutSelection?: string;
  @Field()
  @Column({ nullable: true })
  environmentalEngineer?: string;
  @Field()
  @Column({ nullable: true })
  representative?: string;
  @Field()
  @Column({ nullable: true })
  passedSample?: string;
  @Field(type => [Application])
  @OneToMany(
    type => Application,
    applications => applications.act,
    { deferrable: 'INITIALLY DEFERRED', eager: true },
  )
  applications?: Application[];
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
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
