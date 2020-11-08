import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class LabTypeOfSampleTemplateModel {
  @Field(type => ID)
  @PrimaryColumn()
  labId: string;
  @PrimaryColumn()
  @Field(type => ID)
  typeOfSampleId: string;
  @Column()
  @Field(type => String, { nullable: true })
  path: string;
}
