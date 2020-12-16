/* eslint-disable @typescript-eslint/camelcase */
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Customer, Lab, GeneralCustomer } from '../consumers';
import {
  DefinedIndicator,
  EnvironmentalEngineer,
  Goal,
  Method,
  NormativeDocument,
  PassedSample,
  Place,
  Preparation,
  Representative,
  SampleType,
  ToolType,
  TypeOfSample,
} from '../options';
import { DateAndTime } from '../date-time.model';
import { Application } from '../application';

@Entity()
@ObjectType()
export class ActBase {
  @Field(type => String)
  @Column()
  name: string;
  @Field(type => Customer)
  @ManyToOne(
    type => Customer,
    coustomer => coustomer.acts,
    { cascade: true, onUpdate: 'CASCADE' },
  )
  customer: Customer;
  @Field(type => GeneralCustomer)
  @ManyToOne(
    type => GeneralCustomer,
    general_customer => general_customer.acts,
    { cascade: true, onUpdate: 'CASCADE' },
  )
  generalCustomer: GeneralCustomer;
  @Field(type => Lab)
  @ManyToOne(
    type => Lab,
    lab => lab.acts,
    { cascade: true, onUpdate: 'CASCADE' },
  )
  lab: Lab;
  @Field(type => TypeOfSample)
  @ManyToOne(
    type => TypeOfSample,
    tos => tos.acts,
    { cascade: true },
  )
  typeOfSample: TypeOfSample;
  @Field()
  @Column('text', { nullable: true })
  objectName?: string;
  @Field()
  @ManyToOne(
    type => Place,
    place => place.acts,
    { cascade: true },
  )
  place?: Place;
  @Field(type => DateAndTime)
  @Column(type => DateAndTime)
  datetime: DateAndTime;
  @Field()
  @ManyToOne(
    type => Method,
    method => method.acts,
    { cascade: true },
  )
  method?: Method;
  @Field()
  @ManyToOne(
    type => ToolType,
    toolType => toolType.acts,
    { cascade: true },
  )
  toolType?: ToolType;
  @Field()
  @Column('text', { nullable: true })
  climaticEnvironmental?: string;
  @Field()
  @Column('text', { nullable: true })
  planning?: string;
  @Field(type => [NormativeDocument])
  @ManyToMany(() => NormativeDocument, { cascade: true })
  @JoinTable()
  normativeDocuments?: NormativeDocument[];
  @Field()
  @ManyToOne(
    type => SampleType,
    sampleType => sampleType.acts,
    { cascade: true },
  )
  sampleType?: SampleType;
  @Field(type => String)
  @Column('text', { nullable: true })
  sample?: string;
  @Field(type => [Preparation])
  @ManyToMany(() => Preparation, { cascade: true })
  @JoinTable()
  preparation?: Preparation[];
  @Field()
  @ManyToOne(
    type => Goal,
    goalAct => goalAct.acts,
    { cascade: true },
  )
  goal?: Goal;
  @Field(type => [DefinedIndicator])
  @ManyToMany(() => DefinedIndicator, { cascade: true })
  @JoinTable()
  definedIndicators?: DefinedIndicator[];
  @Field()
  @Column('text', { nullable: true })
  additions?: string;
  @Field()
  @Column('text', { nullable: true })
  informationAboutSelection?: string;
  @Field()
  @ManyToOne(
    type => EnvironmentalEngineer,
    environmentalEngineer => environmentalEngineer.acts,
    { cascade: true },
  )
  environmentalEngineer?: EnvironmentalEngineer;
  @Field()
  @ManyToOne(
    type => Representative,
    representative => representative.acts,
    { cascade: true },
  )
  representative?: Representative;
  @Field()
  @ManyToOne(
    type => PassedSample,
    passedSample => passedSample.acts,
    { cascade: true },
  )
  passedSample?: PassedSample;
  @Field(type => [Application])
  @OneToMany(
    type => Application,
    applications => applications.act,
    { deferrable: 'INITIALLY DEFERRED' },
  )
  applications?: Application[];
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
