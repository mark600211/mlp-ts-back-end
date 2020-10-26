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
import { ObjectType, Field, ID } from '@nestjs/graphql';

import { CustomerAct, LabAct, GeneralCustomerAct } from '../consumers';
import { DocAct } from '../doc';
import {
  AdditionAct,
  ClimaticEnvironmentalAct,
  DefinedIndicatorAct,
  EnvironmentalEngineerAct,
  GoalAct,
  InformationAboutSelectionAct,
  MethodAct,
  NormativeDocumentAct,
  ObjectNameAct,
  PassedSampleAct,
  PlaceAct,
  PlanningAct,
  PreparationAct,
  RepresentativeAct,
  SampleAct,
  SampleTypeAct,
  ToolTypeAct,
  TypeOfSampleAct,
} from '../options';
import { DateAndTime } from '../date-time.model';
import { Application } from '../application';
import { ActEvent } from './act-event.model';

export enum ActStatus {
  CREATED = 'CREATED',
  REGISTERED = 'REGISTERED',
  PROTOCOL = 'PROTOCOL',
  FULL = 'FULL',
}

@Entity()
@ObjectType()
export class Act {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field(type => String)
  @Column()
  name: string;
  @Field(type => CustomerAct)
  @ManyToOne(
    type => CustomerAct,
    coustomer => coustomer.acts,
    { cascade: true, onUpdate: 'CASCADE', eager: true },
  )
  customer: CustomerAct;
  @Field(type => GeneralCustomerAct)
  @ManyToOne(
    type => GeneralCustomerAct,
    general_customer => general_customer.acts,
    { cascade: true, onUpdate: 'CASCADE', eager: true },
  )
  generalCustomer: GeneralCustomerAct;
  @Field(type => LabAct)
  @ManyToOne(
    type => LabAct,
    lab => lab.acts,
    { cascade: true, onUpdate: 'CASCADE', eager: true },
  )
  lab: LabAct;
  @Field(type => [DocAct], { nullable: true })
  @OneToMany(
    type => DocAct,
    docs => docs.act,
    { cascade: true, eager: true, onUpdate: 'CASCADE' },
  )
  docs: DocAct[];
  @Field(type => TypeOfSampleAct)
  @ManyToOne(
    type => TypeOfSampleAct,
    tos => tos.acts,
    { cascade: true, eager: true },
  )
  typeOfSample: TypeOfSampleAct;
  @Field()
  @ManyToOne(
    type => ObjectNameAct,
    objectName => objectName.acts,
    { cascade: true, eager: true },
  )
  objectName?: ObjectNameAct;
  @Field()
  @ManyToOne(
    type => PlaceAct,
    place => place.acts,
    { cascade: true, eager: true },
  )
  place?: PlaceAct;
  @Field(type => DateAndTime)
  @Column(type => DateAndTime)
  datetime: DateAndTime;
  @Field()
  @ManyToOne(
    type => MethodAct,
    method => method.acts,
    { cascade: true, eager: true },
  )
  method?: MethodAct;
  @Field()
  @ManyToOne(
    type => ToolTypeAct,
    toolType => toolType.acts,
    { cascade: true, eager: true },
  )
  toolType?: ToolTypeAct;
  @Field()
  @ManyToOne(
    type => ClimaticEnvironmentalAct,
    climaticEnvironmental => climaticEnvironmental.acts,
    { cascade: true, eager: true },
  )
  climaticEnvironmental?: ClimaticEnvironmentalAct;
  @Field()
  @ManyToOne(
    type => PlanningAct,
    planningAct => planningAct.acts,
    { cascade: true, eager: true },
  )
  planning?: PlanningAct;
  @Field(type => [NormativeDocumentAct])
  @ManyToMany(() => NormativeDocumentAct, { cascade: true, eager: true })
  @JoinTable()
  normativeDocuments?: NormativeDocumentAct[];
  @Field()
  @ManyToOne(
    type => SampleTypeAct,
    sampleType => sampleType.acts,
    { cascade: true, eager: true },
  )
  sampleType?: SampleTypeAct;
  @Field(type => [SampleAct])
  @ManyToMany(() => SampleAct, { cascade: true, eager: true })
  @JoinTable()
  sample?: SampleAct[];
  @Field(type => [PreparationAct])
  @ManyToMany(() => PreparationAct, { cascade: true, eager: true })
  preparation?: PreparationAct[];
  @Field()
  @ManyToOne(
    type => GoalAct,
    goalAct => goalAct.acts,
    { cascade: true, eager: true },
  )
  goal?: GoalAct;
  @Field(type => [DefinedIndicatorAct])
  @ManyToMany(() => DefinedIndicatorAct, { cascade: true, eager: true })
  definedIndicators?: DefinedIndicatorAct[];
  @Field()
  @ManyToOne(
    type => AdditionAct,
    additions => additions.acts,
    { cascade: true, eager: true },
  )
  additions?: AdditionAct;
  @Field()
  @ManyToOne(
    type => InformationAboutSelectionAct,
    informationAboutSelection => informationAboutSelection.acts,
    { cascade: true, eager: true },
  )
  informationAboutSelection?: InformationAboutSelectionAct;
  @Field()
  @ManyToOne(
    type => EnvironmentalEngineerAct,
    environmentalEngineer => environmentalEngineer.acts,
    { cascade: true, eager: true },
  )
  environmentalEngineer?: EnvironmentalEngineerAct;
  @Field()
  @ManyToOne(
    type => RepresentativeAct,
    representative => representative.acts,
    { cascade: true, eager: true },
  )
  representative?: RepresentativeAct;
  @Field()
  @ManyToOne(
    type => PassedSampleAct,
    passedSample => passedSample.acts,
    { cascade: true, eager: true },
  )
  passedSample?: PassedSampleAct;
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
