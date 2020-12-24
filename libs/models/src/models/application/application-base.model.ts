import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Act, ActBase } from '../acts';
import { DateAndTime } from '../date-time.model';
import { Place } from '../options';

@Entity()
@InputType('ApplicationInput')
@ObjectType()
export class ApplicationBase {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(
    type => Act,
    act => act.applications,
    { cascade: true },
  )
  act: Act;
  @Field(type => Place, { nullable: true })
  @ManyToOne(
    type => Place,
    place => place.application,
    { eager: true, cascade: true },
  )
  public place?: Place;
  @Field(type => DateAndTime, { nullable: true })
  @Column(type => DateAndTime)
  public datetime: DateAndTime;
}
